// YouTube Data API Integration
class YouTubeAPI {
    constructor() {
        // You'll need to get a YouTube Data API key from Google Cloud Console
        this.apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
        this.channelId = 'YOUR_CHANNEL_ID'; // Replace with your YeagX channel ID
        this.maxResults = 1; // Get only the latest video
    }

    async getLatestVideo() {
        try {
            // First, get the channel's uploads playlist ID
            const channelResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${this.channelId}&key=${this.apiKey}`
            );
            const channelData = await channelResponse.json();
            
            if (!channelData.items || channelData.items.length === 0) {
                throw new Error('Channel not found');
            }

            const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

            // Get the latest video from the uploads playlist
            const videosResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${this.maxResults}&key=${this.apiKey}`
            );
            const videosData = await videosResponse.json();

            if (!videosData.items || videosData.items.length === 0) {
                throw new Error('No videos found');
            }

            const latestVideo = videosData.items[0].snippet;
            return {
                videoId: latestVideo.resourceId.videoId,
                title: latestVideo.title,
                description: latestVideo.description,
                thumbnail: latestVideo.thumbnails.high.url,
                publishedAt: latestVideo.publishedAt
            };
        } catch (error) {
            console.error('Error fetching latest video:', error);
            return null;
        }
    }

    updateVideoDisplay(videoData) {
        if (!videoData) {
            // Fallback to a placeholder or error message
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
            // Truncate description if too long
            const shortDesc = videoData.description.length > 100 
                ? videoData.description.substring(0, 100) + '...' 
                : videoData.description;
            videoDescription.textContent = shortDesc;
        }

        // Add a "New" badge if video is less than 7 days old
        this.addNewBadge(videoData.publishedAt);
    }

    addNewBadge(publishedAt) {
        const videoInfo = document.querySelector('.video-info h3');
        if (!videoInfo) return;

        const publishedDate = new Date(publishedAt);
        const now = new Date();
        const daysDiff = (now - publishedDate) / (1000 * 60 * 60 * 24);

        if (daysDiff <= 7) {
            // Remove existing badge if any
            const existingBadge = videoInfo.querySelector('.new-badge');
            if (existingBadge) existingBadge.remove();

            // Add new badge
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

    // Initialize the YouTube integration
    async init() {
        const videoData = await this.getLatestVideo();
        this.updateVideoDisplay(videoData);
        
        // Refresh every 30 minutes to check for new videos
        setInterval(async () => {
            const newVideoData = await this.getLatestVideo();
            this.updateVideoDisplay(newVideoData);
        }, 30 * 60 * 1000);
    }
}

// Add pulse animation for the NEW badge
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.7; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const youtubeAPI = new YouTubeAPI();
    youtubeAPI.init();
}); 