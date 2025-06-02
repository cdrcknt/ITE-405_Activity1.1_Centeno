// Programming language icons mapping
const languageIcons = {
    'python': '🐍',
    'java': '☕',
    'javascript': '🟨',
    'html': '🌐',
    'css': '🎨',
    'c++': '⚡',
    'c#': '🔷',
    'php': '🐘',
    'ruby': '💎',
    'go': '🔵',
    'rust': '🦀',
    'swift': '🍎',
    'kotlin': '🟠',
    'typescript': '🔷',
    'react': '⚛️',
    'vue': '💚',
    'angular': '🔺',
    'node': '🟢',
    'mongodb': '🍃',
    'mysql': '🐬',
    'postgresql': '🐘',
    'git': '📝',
    'docker': '🐳',
    'aws': '☁️',
    'firebase': '🔥'
};

// Utility functions
function adjustBrightness(hex, percent) {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function generateInfographic() {
    // Validate form inputs
    if (!validateForm()) {
        return;
    }

    // Get form values with enhanced validation
    const name = document.getElementById('studentName').value.trim() || 'Your Name Here';
    const program = document.getElementById('program').value || 'Your Program';
    const address = document.getElementById('address').value.trim() || 'Your Address';
    const hobby = document.getElementById('hobby').value.trim() || 'Your Hobby';
    const siblings = parseInt(document.getElementById('siblings').value) || 0;
    const skill = document.getElementById('skill').value.trim() || 'Your Skill';
    const languages = document.getElementById('languages').value.trim() || 'Add your languages above';
    const themeColor = document.getElementById('themeColor').value;
    
    // Update display with formatting
    document.getElementById('displayName').textContent = capitalizeWords(name);
    document.getElementById('displayProgram').textContent = program;
    document.getElementById('displayAddress').textContent = capitalizeWords(address);
    document.getElementById('displayHobby').textContent = capitalizeWords(hobby);
    document.getElementById('displaySiblings').textContent = siblings;
    document.getElementById('displaySkill').textContent = capitalizeWords(skill);
    
    // Update theme colors
    updateThemeColors(themeColor);
    
    // Generate programming languages with enhanced features
    generateSkillsChart(languages, themeColor);
    
    // Add animation and effects
    animateInfographic();
    
    // Show success message
    showNotification('Infographic generated successfully!', 'success');
}

function validateForm() {
    const requiredFields = [
        { id: 'studentName', name: 'Name' },
        { id: 'program', name: 'Program' },
        { id: 'address', name: 'Address' },
        { id: 'hobby', name: 'Hobby' }
    ];
    
    let isValid = true;
    const errors = [];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        const value = element.value.trim();
        
        if (!value) {
            errors.push(`${field.name} is required`);
            element.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            element.style.borderColor = '#e1e5e9';
        }
    });
    
    // Validate siblings count
    const siblings = document.getElementById('siblings').value;
    if (siblings && (isNaN(siblings) || siblings < 0 || siblings > 20)) {
        errors.push('Number of siblings must be between 0 and 20');
        document.getElementById('siblings').style.borderColor = '#ff6b6b';
        isValid = false;
    }
    
    if (!isValid) {
        showNotification(errors.join('<br>'), 'error');
    }
    
    return isValid;
}

function capitalizeWords(str) {
    return str.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

function updateThemeColors(themeColor) {
    const profileHeader = document.querySelector('.profile-header');
    const cardIcons = document.querySelectorAll('.card-icon');
    const primaryBtn = document.querySelector('.primary-btn');
    
    // Create dynamic styles
    const existingStyle = document.getElementById('dynamic-theme');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    const style = document.createElement('style');
    style.id = 'dynamic-theme';
    style.textContent = `
        .profile-header {
            background: linear-gradient(135deg, ${themeColor} 0%, ${adjustBrightness(themeColor, -20)} 100%) !important;
        }
        .card-icon {
            background: linear-gradient(135deg, ${themeColor}, ${adjustBrightness(themeColor, -20)}) !important;
            box-shadow: 0 10px 25px ${hexToRgba(themeColor, 0.3)} !important;
        }
        .data-card::before {
            background: linear-gradient(135deg, ${themeColor}, ${adjustBrightness(themeColor, -20)}) !important;
        }
        .primary-btn {
            background: linear-gradient(135deg, ${themeColor} 0%, ${adjustBrightness(themeColor, -20)} 100%) !important;
            box-shadow: 0 8px 25px ${hexToRgba(themeColor, 0.3)} !important;
        }
        .primary-btn:hover {
            box-shadow: 0 15px 35px ${hexToRgba(themeColor, 0.4)} !important;
        }
        .form-header {
            border-bottom-color: ${themeColor} !important;
        }
        .form-header i {
            color: ${themeColor} !important;
        }
        input:focus, select:focus, textarea:focus {
            border-color: ${themeColor} !important;
            box-shadow: 0 0 0 4px ${hexToRgba(themeColor, 0.1)} !important;
        }
    `;
    document.head.appendChild(style);
}

function generateSkillsChart(languages, themeColor) {
    const skillsChart = document.getElementById('skillsChart');
    
    if (!languages || languages.trim() === '' || languages === 'Add your languages above') {
        skillsChart.innerHTML = `
            <div class="skill-item">
                <i class="fas fa-plus"></i>
                <span>Add your languages above</span>
            </div>
        `;
        return;
    }
    
    // Parse and clean languages
    const languageList = languages.split(',')
        .map(lang => lang.trim().toLowerCase())
        .filter(lang => lang.length > 0)
        .slice(0, 12); // Limit to 12 skills for better display
    
    if (languageList.length === 0) {
        skillsChart.innerHTML = `
            <div class="skill-item">
                <i class="fas fa-exclamation-circle"></i>
                <span>No valid languages found</span>
            </div>
        `;
        return;
    }
    
    // Create skill items with enhanced styling
    skillsChart.innerHTML = languageList.map((lang, index) => {
        const icon = languageIcons[lang] || '💻';
        const displayName = lang.toUpperCase();
        const animationDelay = index * 0.1;
        
        return `
            <div class="skill-item" 
                 data-lang="${lang}" 
                 style="animation-delay: ${animationDelay}s; --theme-color: ${themeColor}">
                <span class="skill-icon">${icon}</span>
                <span class="skill-name">${displayName}</span>
            </div>
        `;
    }).join('');
    
    // Add hover effects and statistics
    addSkillInteractions();
    updateSkillsStats(languageList.length);
}

function addSkillInteractions() {
    const skillItems = document.querySelectorAll('.skill-item[data-lang]');
    
    skillItems.forEach(item => {
        // Add click effect
        item.addEventListener('click', function() {
            this.style.transform = 'scale(1.1) rotateY(360deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 600);
        });
        
        // Add pulse animation on hover
        item.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out infinite alternate';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
}

function updateSkillsStats(count) {
    const skillsHeader = document.querySelector('.skills-header h3');
    skillsHeader.textContent = `Programming Languages & Technologies (${count})`;
}

function animateInfographic() {
    // Animate data cards
    const dataCards = document.querySelectorAll('.data-card');
    dataCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animate profile header
    const profileHeader = document.querySelector('.profile-header');
    profileHeader.classList.add('animate-profile');
    
    // Animate skills
    setTimeout(() => {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((skill, index) => {
            skill.style.opacity = '0';
            skill.style.transform = 'scale(0)';
            
            setTimeout(() => {
                skill.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                skill.style.opacity = '1';
                skill.style.transform = 'scale(1)';
            }, index * 100);
        });
    }, 800);
    
    // Add bounce effect to avatar
    const avatar = document.querySelector('.avatar-icon');
    avatar.style.animation = 'bounce 2s ease-in-out infinite';
}

function downloadInfographic() {
    const infographic = document.getElementById('infographic');
    const downloadBtn = document.querySelector('.download-btn');
    
    // Show loading state
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    downloadBtn.disabled = true;
    
    // Configure html2canvas options
    const options = {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: infographic.scrollWidth,
        height: infographic.scrollHeight,
        scrollX: 0,
        scrollY: 0
    };
    
    html2canvas(infographic, options)
        .then(canvas => {
            // Create download link
            const link = document.createElement('a');
            const name = document.getElementById('studentName').value.trim() || 'Student';
            const filename = `${name.replace(/\s+/g, '_')}_Data_Story.png`;
            
            link.download = filename;
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();
            
            showNotification('Infographic downloaded successfully!', 'success');
        })
        .catch(error => {
            console.error('Download failed:', error);
            showNotification('Download failed. Please try again.', 'error');
        })
        .finally(() => {
            // Reset button state
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        });
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 400px;
        font-family: 'Poppins', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #10ac84, #0be881)',
        error: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
        warning: 'linear-gradient(135deg, #ffa726, #ff9800)',
        info: 'linear-gradient(135deg, #667eea, #764ba2)'
    };
    return colors[type] || colors.info;
}

// Add CSS animations
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            100% { transform: scale(1.05); }
        }
        
        .animate-profile {
            animation: slideInDown 0.8s ease-out;
        }
        
        @keyframes slideInDown {
            0% {
                transform: translateY(-50px);
                opacity: 0;
            }
            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            margin-left: auto;
            padding: 5px;
            border-radius: 50%;
            transition: background 0.2s ease;
        }
        
        .notification-close:hover {
            background: rgba(255,255,255,0.2);
        }
    `;
    document.head.appendChild(style);
}

// Initialize animations
addAnimationStyles();

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add real-time preview
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(function(input) {
        input.addEventListener('input', debounce(generateInfographic, 300));
    });
    
    // Initialize color picker
    const colorPicker = document.getElementById('themeColor');
    colorPicker.addEventListener('change', function() {
        updateThemeColors(this.value);
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'Enter') {
                e.preventDefault();
                generateInfographic();
            } else if (e.key === 's') {
                e.preventDefault();
                downloadInfographic();
            }
        }
    });
});

// Utility function for debouncing
function debounce(func, wait) {
    var timeout;
    return function executedFunction() {
        var context = this;
        var args = arguments;
        var later = function() {
            clearTimeout(timeout);
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}