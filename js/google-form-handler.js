document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;

    // Google Form entry IDs (these are the field IDs from your Google Form)
    const GOOGLE_FORM_ENTRIES = {
        name: 'entry.371080705',
        email: 'entry.583663237',
        message: 'entry.474315458'
    };

    // Google Form URL
    const GOOGLE_FORM_URL = 'https://forms.gle/9eE7xVVqieSUfEyXA';

    function setLoadingState(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Preparing form...';
            submitBtn.style.opacity = '0.7';
        } else {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.style.opacity = '1';
        }
    }

    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Clear previous error messages
        clearErrors();
        
        let isValid = true;
        
        // Name validation
        if (name.length < 2) {
            showError('name', 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Message validation
        if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            color: #dc3545;
            font-size: 12px;
            margin-top: 5px;
        `;
        errorDiv.textContent = message;
        
        field.style.borderColor = '#dc3545';
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearErrors() {
        // Remove all error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        // Reset border colors
        const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
    }

    function submitToGoogleForm(formData) {
        // Create a hidden iframe to submit the form
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.name = 'google-form-submit';
        document.body.appendChild(iframe);
        
        // Create the form
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://docs.google.com/forms/d/e/1FAIpQLScZHYFjZELqcQnVqWfAxgjds4gZisUgBFVstaJP-pTNkTtvBw/formResponse';
        form.target = 'google-form-submit';
        
        // Add form fields
        const fields = [
            { name: GOOGLE_FORM_ENTRIES.name, value: formData.name },
            { name: GOOGLE_FORM_ENTRIES.email, value: formData.email },
            { name: GOOGLE_FORM_ENTRIES.message, value: formData.message }
        ];
        
        fields.forEach(field => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = field.name;
            input.value = field.value;
            form.appendChild(input);
        });
        
        // Submit the form
        document.body.appendChild(form);
        form.submit();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(form);
            document.body.removeChild(iframe);
        }, 1000);
    }

    function showSuccessPopup() {
        // Create popup overlay
        const overlay = document.createElement('div');
        overlay.className = 'success-popup-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        // Create popup content
        const popup = document.createElement('div');
        popup.className = 'success-popup';
        popup.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            transform: scale(0.7);
            transition: transform 0.3s ease;
            position: relative;
        `;
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✖';
        closeBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        `;
        
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.opacity = '1';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.opacity = '0.7';
        });
        
        // Popup content
        popup.innerHTML = `
            <div style="margin-bottom: 20px;">
                <div style="
                    width: 80px;
                    height: 80px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 40px;
                ">✅</div>
                <h2 style="margin: 0 0 15px 0; font-size: 28px; font-weight: 600;">Message Sent!</h2>
                <p style="margin: 0; font-size: 16px; line-height: 1.5; opacity: 0.9;">
                    Thank you for reaching out! I've received your message and will get back to you as soon as possible.
                </p>
            </div>
            <button class="popup-close-btn" style="
                background: rgba(255, 255, 255, 0.2);
                border: 2px solid rgba(255, 255, 255, 0.3);
                color: white;
                padding: 12px 30px;
                border-radius: 25px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-top: 20px;
            ">Got it!</button>
        `;
        
        // Add close button to popup
        popup.appendChild(closeBtn);
        
        // Add popup to overlay
        overlay.appendChild(popup);
        
        // Add overlay to body
        document.body.appendChild(overlay);
        
        // Animate in
        setTimeout(() => {
            overlay.style.opacity = '1';
            popup.style.transform = 'scale(1)';
        }, 10);
        
        // Close functionality
        function closePopup() {
            overlay.style.opacity = '0';
            popup.style.transform = 'scale(0.7)';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        }
        
        // Close on button click
        closeBtn.addEventListener('click', closePopup);
        
        // Close on "Got it!" button click
        const gotItBtn = popup.querySelector('.popup-close-btn');
        gotItBtn.addEventListener('click', closePopup);
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closePopup();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closePopup();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
        
        // Auto close after 5 seconds
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                closePopup();
            }
        }, 5000);
    }

    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Set loading state
        setLoadingState(true);
        
        // Submit directly to Google Forms
        submitToGoogleForm(formData);
        
        // Show success popup
        showSuccessPopup();
        
        // Reset form
        contactForm.reset();
        
        // Reset loading state
        setLoadingState(false);
    });

    // Real-time validation
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const fieldId = this.id;
            const value = this.value.trim();
            
            // Clear previous error for this field
            const existingError = this.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            this.style.borderColor = '';
            
            // Validate field
            if (value === '') return; // Skip empty fields on blur
            
            switch (fieldId) {
                case 'name':
                    if (value.length < 2) {
                        showError('name', 'Name must be at least 2 characters long');
                    }
                    break;
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        showError('email', 'Please enter a valid email address');
                    }
                    break;
                case 'message':
                    if (value.length < 10) {
                        showError('message', 'Message must be at least 10 characters long');
                    }
                    break;
            }
        });
    });
}); 