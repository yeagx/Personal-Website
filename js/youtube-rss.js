// YouTube RSS Feed Integration (No API Key Required)
class YouTubeRSS {
    constructor() {
        this.channelUsername = 'YeagX'; // Your YouTube channel username
        this.rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${this.getChannelId()}`;
    }

    // Get channel ID from username (you can hardcode this for better performance)
    getChannelId() {
        // You can find your channel ID in your YouTube channel URL
        // or replace this with your actual channel ID for better performance
        return 'UCyrZcIzWhSUJUxpa5mzYF9w'; // YeagX Channel ID
    }

    async getLatestVideo() {
        try {
            // Use a CORS proxy to fetch the RSS feed
            const proxyUrl = 'https://api.allorigins.win/raw?url=';
            const response = await fetch(proxyUrl + encodeURIComponent(this.rssUrl));
            const xmlText = await response.text();
            
            // Parse the XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            
            // Get the first (latest) video entry
            const entry = xmlDoc.querySelector('entry');
            if (!entry) {
                throw new Error('No videos found');
            }

            const videoId = entry.querySelector('yt\\:videoId, videoId').textContent;
            const title = entry.querySelector('title').textContent;
            const published = entry.querySelector('published').textContent;
            const description = entry.querySelector('media\\:description, description')?.textContent || '';

            return {
                videoId: videoId,
                title: title,
                description: description,
                publishedAt: published
            };
        } catch (error) {
            console.error('Error fetching latest video from RSS:', error);
            return null;
        }
    }

    updateVideoDisplay(videoData) {
        if (!videoData) {
            this.showFallback();
            return;
        }

        const videoContainer = document.querySelector('.video-container iframe');
        const videoTitle = document.querySelector('.video-info h3');
        const videoDescription = document.querySelector('.video-info p');

        if (videoContainer) {
            videoContainer.src = `https://www.youtube.com/embed/${videoData.videoId}`;
        }

        if (videoTitle) {
            videoTitle.textContent = videoData.title;
        }

        if (videoDescription) {
            const shortDesc = videoData.description.length > 100 
                ? videoData.description.substring(0, 100) + '...' 
                : videoData.description;
            videoDescription.textContent = shortDesc;
        }

        this.addNewBadge(videoData.publishedAt);
    }

    addNewBadge(publishedAt) {
        const videoInfo = document.querySelector('.video-info h3');
        if (!videoInfo) return;

        const publishedDate = new Date(publishedAt);
        const now = new Date();
        const daysDiff = (now - publishedDate) / (1000 * 60 * 60 * 24);

        if (daysDiff <= 7) {
            const existingBadge = videoInfo.querySelector('.new-badge');
            if (existingBadge) existingBadge.remove();

            const badge = document.createElement('span');
            badge.className = 'new-badge';
            badge.textContent = 'NEW';
            badge.style.cssText = `
                background: linear-gradient(90deg, rgba(246,0,255,1) 0%, rgba(255,136,0,1) 100%);
                color: white;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: bold;
                margin-left: 10px;
                animation: pulse 2s infinite;
            `;
            videoInfo.appendChild(badge);
        }
    }

    showFallback() {
        const videoContainer = document.querySelector('.video-container');
        const videoInfo = document.querySelector('.video-info');
        
        if (videoContainer) {
            videoContainer.innerHTML = `
                <div style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(255,255,255,0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    color: #ccc;
                    font-size: 18px;
                ">
                    <div style="text-align: center;">
                        <i class="fab fa-youtube" style="font-size: 48px; margin-bottom: 10px; color: #ff0000;"></i>
                        <p>Latest video will appear here</p>
                        <p style="font-size: 14px; margin-top: 10px;">Check out my channel for new content!</p>
                    </div>
                </div>
            `;
        }

        if (videoInfo) {
            videoInfo.innerHTML = `
                <h3>Coming Soon</h3>
                <p>New content is on the way! Subscribe to stay updated.</p>
            `;
        }
    }

    async init() {
        const videoData = await this.getLatestVideo();
        this.updateVideoDisplay(videoData);
        
        // Refresh every hour
        setInterval(async () => {
            const newVideoData = await this.getLatestVideo();
            this.updateVideoDisplay(newVideoData);
        }, 60 * 60 * 1000);
    }
}

// Initialize RSS version (uncomment to use instead of API version)
document.addEventListener('DOMContentLoaded', () => {
    const youtubeRSS = new YouTubeRSS();
    youtubeRSS.init();
}); 