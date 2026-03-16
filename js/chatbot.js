/**
 * ATA Chatbot Widget
 * Smart Home Automation Sales & Support Chatbot
 * Self-contained, no external dependencies
 */

(function() {
  'use strict';

  const ATAChatbot = {
    state: {
      isOpen: false,
      currentScreen: 'greeting',
      userEmail: '',
      userName: '',
      userPhone: '',
      selectedService: '',
      messages: [],
      sessionId: Math.random().toString(36).substr(2, 9)
    },

    config: {
      primaryColor: '#3A7FC1',
      darkBg: '#0D1117',
      lightText: '#FFFFFF',
      borderColor: '#1C2128',
      accentBlue: '#3A7FC1',
      serviceCallFee: 99,
      squareBookingUrl: 'SQUARE_BOOKING_URL',
      apiEndpoint: '/api/leads',
      jorgePhone: '(941) 263-5325',
      jorgeEmail: 'jorge@allthingsautomated.org'
    },

    services: {
      'smart-lighting': {
        name: 'Smart Lighting Design',
        description: 'Automated lighting control with preset scenes, dimming, and color tuning for every room in your home.'
      },
      'security-cameras': {
        name: 'Security & Cameras',
        description: 'Professional surveillance system installation with 24/7 monitoring, smart alerts, and cloud backup.'
      },
      'climate-control': {
        name: 'Climate Control',
        description: 'Intelligent HVAC automation with smart thermostats, zoning, and energy optimization.'
      },
      'full-automation': {
        name: 'Full Home Automation',
        description: 'Complete Control4 and Lutron systems integration for unified home control across all systems.'
      }
    },

    init() {
      this.render();
      this.attachEventListeners();
    },

    render() {
      const container = document.createElement('div');
      container.id = 'ata-chatbot-widget';
      container.innerHTML = this.getWidgetHTML();
      document.body.appendChild(container);
      this.injectStyles();
    },

    getWidgetHTML() {
      return `
        <div class="ata-chat-widget">
          <button class="ata-chat-toggle" id="ata-chat-toggle" aria-label="Open chat" title="Chat with us">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>

          <div class="ata-chat-window" id="ata-chat-window" style="display: none;">
            <div class="ata-chat-header">
              <div class="ata-chat-title">ATA Assistant</div>
              <button class="ata-chat-close" id="ata-chat-close" aria-label="Close chat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div class="ata-chat-messages" id="ata-chat-messages"></div>

            <div class="ata-chat-input-area" id="ata-chat-input-area"></div>

            <div class="ata-chat-footer">Powered by All Things Automated</div>
          </div>
        </div>
      `;
    },

    attachEventListeners() {
      const toggle = document.getElementById('ata-chat-toggle');
      const close = document.getElementById('ata-chat-close');

      toggle.addEventListener('click', () => this.toggleChat());
      close.addEventListener('click', () => this.closeChat());

      // Close on outside click (optional, can be disabled for better UX)
      document.addEventListener('click', (e) => {
        const widget = document.getElementById('ata-chatbot-widget');
        if (widget && this.state.isOpen && !widget.contains(e.target)) {
          // Don't auto-close for better usability
        }
      });
    },

    toggleChat() {
      if (this.state.isOpen) {
        this.closeChat();
      } else {
        this.openChat();
      }
    },

    openChat() {
      this.state.isOpen = true;
      const chatWindow = document.getElementById('ata-chat-window');
      const toggle = document.getElementById('ata-chat-toggle');

      chatWindow.style.display = 'flex';
      toggle.classList.add('active');

      // If no messages yet, show greeting
      if (this.state.messages.length === 0) {
        this.showGreeting();
      }

      // Scroll to bottom
      setTimeout(() => this.scrollToBottom(), 100);
    },

    closeChat() {
      this.state.isOpen = false;
      const chatWindow = document.getElementById('ata-chat-window');
      const toggle = document.getElementById('ata-chat-toggle');

      chatWindow.style.display = 'none';
      toggle.classList.remove('active');
    },

    showGreeting() {
      this.addMessage('bot', "Hey there! I'm the ATA assistant. How can I help you today?");
      this.showQuickReplies([
        { text: 'Get a Quote', action: 'quote' },
        { text: 'Book a Service Call', action: 'booking' },
        { text: 'Learn About Services', action: 'services' },
        { text: 'Talk to Jorge', action: 'contact' }
      ]);
      this.state.currentScreen = 'greeting';
    },

    addMessage(sender, text) {
      const message = { sender, text, timestamp: new Date() };
      this.state.messages.push(message);
      this.renderMessage(message);
      this.scrollToBottom();
    },

    renderMessage(message) {
      const messagesContainer = document.getElementById('ata-chat-messages');
      const messageEl = document.createElement('div');
      messageEl.className = `ata-message ata-message-${message.sender}`;
      messageEl.textContent = message.text;
      messagesContainer.appendChild(messageEl);
    },

    showQuickReplies(replies) {
      const inputArea = document.getElementById('ata-chat-input-area');
      inputArea.innerHTML = '';

      const repliesContainer = document.createElement('div');
      repliesContainer.className = 'ata-quick-replies';

      replies.forEach(reply => {
        const btn = document.createElement('button');
        btn.className = 'ata-quick-reply-btn';
        btn.textContent = reply.text;
        btn.addEventListener('click', () => this.handleQuickReply(reply.action));
        repliesContainer.appendChild(btn);
      });

      inputArea.appendChild(repliesContainer);
    },

    handleQuickReply(action) {
      if (action === 'quote') {
        this.startQuoteFlow();
      } else if (action === 'booking') {
        this.startBookingFlow();
      } else if (action === 'services') {
        this.showServicesInfo();
      } else if (action === 'contact') {
        this.showContactInfo();
      }
    },

    startQuoteFlow() {
      this.addMessage('bot', 'Great! What service are you most interested in?');
      this.showQuickReplies([
        { text: 'Smart Lighting Design', action: 'service-smart-lighting' },
        { text: 'Security & Cameras', action: 'service-security-cameras' },
        { text: 'Climate Control', action: 'service-climate-control' },
        { text: 'Full Home Automation', action: 'service-full-automation' }
      ]);
      this.state.currentScreen = 'quote-service';
    },

    handleServiceSelection(serviceKey) {
      this.state.selectedService = serviceKey;
      const serviceName = this.services[serviceKey].name;
      this.addMessage('user', serviceName);
      this.addMessage('bot', `Perfect! I'll get you a quote for ${serviceName}. Let me collect a few details.`);
      this.promptForName();
    },

    promptForName() {
      const inputArea = document.getElementById('ata-chat-input-area');
      inputArea.innerHTML = `
        <div class="ata-input-group">
          <input type="text" id="ata-name-input" class="ata-text-input" placeholder="Your name" maxlength="100">
          <button class="ata-submit-btn" onclick="window.ATAChatbot.submitName()">Continue</button>
        </div>
      `;
      document.getElementById('ata-name-input').focus();
      document.getElementById('ata-name-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.submitName();
      });
    },

    submitName() {
      const input = document.getElementById('ata-name-input');
      if (!input) return;

      const name = input.value.trim();
      if (!name) {
        this.addMessage('bot', 'Please enter your name to continue.');
        return;
      }

      this.state.userName = name;
      this.addMessage('user', name);
      this.addMessage('bot', `Thanks ${name}! What is your email address?`);
      this.promptForEmail();
    },

    promptForEmail() {
      const inputArea = document.getElementById('ata-chat-input-area');
      inputArea.innerHTML = `
        <div class="ata-input-group">
          <input type="email" id="ata-email-input" class="ata-text-input" placeholder="your@email.com" maxlength="254">
          <button class="ata-submit-btn" onclick="window.ATAChatbot.submitEmail()">Continue</button>
        </div>
      `;
      document.getElementById('ata-email-input').focus();
      document.getElementById('ata-email-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.submitEmail();
      });
    },

    submitEmail() {
      const input = document.getElementById('ata-email-input');
      if (!input) return;

      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        this.addMessage('bot', 'Please enter a valid email address.');
        return;
      }

      this.state.userEmail = email;
      this.addMessage('user', email);
      this.addMessage('bot', 'Great! And what is your phone number?');
      this.promptForPhone();
    },

    promptForPhone() {
      const inputArea = document.getElementById('ata-chat-input-area');
      inputArea.innerHTML = `
        <div class="ata-input-group">
          <input type="tel" id="ata-phone-input" class="ata-text-input" placeholder="(941) 123-4567" maxlength="20">
          <button class="ata-submit-btn" onclick="window.ATAChatbot.submitPhone()">Submit</button>
        </div>
      `;
      document.getElementById('ata-phone-input').focus();
      document.getElementById('ata-phone-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.submitPhone();
      });
    },

    submitPhone() {
      const input = document.getElementById('ata-phone-input');
      if (!input) return;

      const phone = input.value.trim();
      if (!phone || phone.length < 10) {
        this.addMessage('bot', 'Please enter a valid phone number.');
        return;
      }

      this.state.userPhone = phone;
      this.addMessage('user', phone);
      this.submitLead();
    },

    submitLead() {
      const inputArea = document.getElementById('ata-chat-input-area');
      inputArea.innerHTML = '<div class="ata-loading">Submitting your quote request...</div>';

      const payload = {
        name: this.state.userName,
        email: this.state.userEmail,
        phone: this.state.userPhone,
        service: this.state.selectedService,
        source: 'chatbot',
        sessionId: this.state.sessionId
      };

      fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (response.ok) {
            this.addMessage('bot', "Perfect! I've received your quote request. Jorge will review your details and get back to you soon with a customized quote.");
            this.showPostSubmissionOptions();
            // Send email notification client-side via FormSubmit
            fetch('https://formsubmit.co/ajax/65a6ab2ee87c151ffec81e39d824f727', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify({
                _subject: '[NEW LEAD] ' + (payload.name || 'Unknown') + ' - ' + (payload.service || 'Chatbot'),
                Name: payload.name || 'Not provided',
                Email: payload.email || 'Not provided',
                Phone: payload.phone || 'Not provided',
                Service: payload.service || 'Not specified',
                Source: 'Chatbot Widget',
                Message: 'Lead captured via website chatbot',
                _template: 'table'
              })
            }).catch(function() {});
          } else {
            throw new Error('Server error');
          }
        })
        .catch(error => {
          console.error('Lead submission error:', error);
          this.addMessage('bot', 'There was an issue submitting your request. Please call us directly at (941) 263-5325 or try again.');
          this.showPostSubmissionOptions();
        });
    },

    showPostSubmissionOptions() {
      const inputArea = document.getElementById('ata-chat-input-area');
      inputArea.innerHTML = '';

      this.showQuickReplies([
        { text: 'Learn About Services', action: 'services' },
        { text: 'Talk to Jorge', action: 'contact' },
        { text: 'Start Over', action: 'restart' }
      ]);
    },

    startBookingFlow() {
      this.addMessage('bot', 'A professional service call is $99 and includes a full system assessment, recommendations, and a binding quote on any work needed.');
      this.addMessage('bot', 'Ready to book? I can send you to our booking system now.');

      this.showQuickReplies([
        { text: 'Book Service Call', action: 'open-booking' },
        { text: 'Back to Menu', action: 'restart' }
      ]);
      this.state.currentScreen = 'booking';
    },

    openBookingLink() {
      if (this.config.squareBookingUrl === 'SQUARE_BOOKING_URL') {
        this.addMessage('bot', 'Booking system is being configured. Please call us at (941) 263-5325 to schedule your service call.');
      } else {
        window.open(this.config.squareBookingUrl, '_blank');
        this.addMessage('bot', 'Opening the booking system in a new window. Select a time that works best for you.');
      }

      setTimeout(() => {
        this.showQuickReplies([
          { text: 'Need Help?', action: 'contact' },
          { text: 'Back to Menu', action: 'restart' }
        ]);
      }, 500);
    },

    showServicesInfo() {
      this.addMessage('bot', 'Here is what we offer:');

      Object.entries(this.services).forEach(([key, service]) => {
        this.addMessage('bot', `${service.name}: ${service.description}`);
      });

      this.addMessage('bot', 'Visit our Services page for more details.');

      setTimeout(() => {
        this.showQuickReplies([
          { text: 'Get a Quote', action: 'quote' },
          { text: 'Book a Service Call', action: 'booking' },
          { text: 'Talk to Jorge', action: 'contact' }
        ]);
      }, 500);

      this.state.currentScreen = 'services';
    },

    showContactInfo() {
      this.addMessage('bot', 'You can reach Jorge directly:');
      this.addMessage('bot', `Phone: ${this.config.jorgePhone}`);
      this.addMessage('bot', `Email: ${this.config.jorgeEmail}`);
      this.addMessage('bot', 'Or use the contact form on our website for a detailed inquiry.');

      setTimeout(() => {
        this.showQuickReplies([
          { text: 'Get a Quote', action: 'quote' },
          { text: 'Book a Service Call', action: 'booking' },
          { text: 'Learn About Services', action: 'services' }
        ]);
      }, 500);

      this.state.currentScreen = 'contact';
    },

    restartChat() {
      this.state.currentScreen = 'greeting';
      this.state.userName = '';
      this.state.userEmail = '';
      this.state.userPhone = '';
      this.state.selectedService = '';
      this.state.messages = [];

      const messagesContainer = document.getElementById('ata-chat-messages');
      messagesContainer.innerHTML = '';

      const inputArea = document.getElementById('ata-chat-input-area');
      inputArea.innerHTML = '';

      this.showGreeting();
    },

    scrollToBottom() {
      const container = document.getElementById('ata-chat-messages');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },

    injectStyles() {
      const style = document.createElement('style');
      style.textContent = `
        #ata-chatbot-widget * {
          box-sizing: border-box;
        }

        .ata-chat-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          font-family: var(--font-body, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif);
          z-index: 9999;
        }

        .ata-chat-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${this.config.primaryColor}, ${this.config.accentBlue});
          border: none;
          color: ${this.config.lightText};
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(58, 127, 193, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          padding: 0;
        }

        .ata-chat-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 30px rgba(58, 127, 193, 0.6);
        }

        .ata-chat-toggle.active {
          display: none;
        }

        .ata-chat-toggle svg {
          width: 28px;
          height: 28px;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .ata-chat-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 420px;
          height: 600px;
          background: ${this.config.darkBg};
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 1px rgba(0, 0, 0, 0.3);
          display: none;
          flex-direction: column;
          border: 1px solid ${this.config.borderColor};
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ata-chat-header {
          background: linear-gradient(135deg, ${this.config.darkBg}, #1a1f26);
          padding: 20px;
          border-bottom: 1px solid ${this.config.borderColor};
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 16px 16px 0 0;
        }

        .ata-chat-title {
          color: ${this.config.lightText};
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.3px;
        }

        .ata-chat-close {
          background: none;
          border: none;
          color: ${this.config.lightText};
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s;
        }

        .ata-chat-close:hover {
          opacity: 0.7;
        }

        .ata-chat-close svg {
          width: 20px;
          height: 20px;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .ata-chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ata-message {
          animation: fadeIn 0.3s ease;
          word-wrap: break-word;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ata-message-bot {
          background: ${this.config.borderColor};
          color: ${this.config.lightText};
          padding: 12px 16px;
          border-radius: 12px;
          border-bottom-left-radius: 4px;
          max-width: 85%;
          font-size: 14px;
          line-height: 1.5;
          align-self: flex-start;
        }

        .ata-message-user {
          background: ${this.config.primaryColor};
          color: ${this.config.lightText};
          padding: 12px 16px;
          border-radius: 12px;
          border-bottom-right-radius: 4px;
          max-width: 85%;
          font-size: 14px;
          line-height: 1.5;
          align-self: flex-end;
        }

        .ata-chat-input-area {
          padding: 16px;
          border-top: 1px solid ${this.config.borderColor};
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ata-quick-replies {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ata-quick-reply-btn {
          background: none;
          border: 1px solid ${this.config.primaryColor};
          color: ${this.config.primaryColor};
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s;
          text-align: left;
        }

        .ata-quick-reply-btn:hover {
          background: ${this.config.primaryColor};
          color: ${this.config.lightText};
          transform: translateX(4px);
        }

        .ata-input-group {
          display: flex;
          gap: 8px;
        }

        .ata-text-input {
          flex: 1;
          background: ${this.config.borderColor};
          border: 1px solid ${this.config.borderColor};
          color: ${this.config.lightText};
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .ata-text-input:focus {
          outline: none;
          border-color: ${this.config.primaryColor};
          background: rgba(58, 127, 193, 0.05);
        }

        .ata-text-input::placeholder {
          color: #666;
        }

        .ata-submit-btn {
          background: ${this.config.primaryColor};
          border: none;
          color: ${this.config.lightText};
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .ata-submit-btn:hover {
          background: #2a6aa8;
          transform: translateY(-1px);
        }

        .ata-submit-btn:active {
          transform: translateY(0);
        }

        .ata-loading {
          color: #999;
          font-size: 12px;
          padding: 12px;
          text-align: center;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .ata-chat-footer {
          padding: 12px 20px;
          font-size: 11px;
          color: #666;
          text-align: center;
          border-top: 1px solid ${this.config.borderColor};
          background: rgba(13, 17, 23, 0.5);
          border-radius: 0 0 16px 16px;
        }

        /* Scrollbar styling */
        .ata-chat-messages::-webkit-scrollbar {
          width: 6px;
        }

        .ata-chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .ata-chat-messages::-webkit-scrollbar-thumb {
          background: ${this.config.borderColor};
          border-radius: 3px;
        }

        .ata-chat-messages::-webkit-scrollbar-thumb:hover {
          background: ${this.config.primaryColor};
        }

        /* Mobile responsive */
        @media (max-width: 480px) {
          .ata-chat-window {
            width: calc(100vw - 20px);
            height: calc(100vh - 100px);
            max-height: 600px;
            right: 10px;
            bottom: 80px;
          }

          .ata-message-bot,
          .ata-message-user {
            max-width: 100%;
          }
        }
      `;

      document.head.appendChild(style);
    }
  };

  // Expose global reference for button onclick handlers
  window.ATAChatbot = ATAChatbot;

  // Public API: open the chat window from external buttons
  ATAChatbot.open = function() {
    if (!this.state.isOpen) {
      this.openChat();
    }
  };

  // Handle quick reply button clicks through window reference
  const originalHandleQuickReply = ATAChatbot.handleQuickReply.bind(ATAChatbot);
  ATAChatbot.handleQuickReply = function(action) {
    if (action.startsWith('service-')) {
      const serviceKey = action.replace('service-', '');
      this.handleServiceSelection(serviceKey);
    } else if (action === 'open-booking') {
      this.openBookingLink();
    } else if (action === 'restart') {
      this.restartChat();
    } else {
      originalHandleQuickReply(action);
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ATAChatbot.init());
  } else {
    ATAChatbot.init();
  }
})();
