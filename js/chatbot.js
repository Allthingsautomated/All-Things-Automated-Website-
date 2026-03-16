/**
 * ATA Chatbot Widget v2
 * Smart Home Automation Sales & Support Chatbot
 * Free-text conversation + quick replies
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
      collectingField: null, // 'name', 'email', 'phone', or null
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
      businessPhone: '(941) 263-5325',
      businessEmail: 'info@allthingsautomated.org',
      businessName: 'All Things Automated'
    },

    services: {
      'smart-lighting': {
        name: 'Smart Lighting Design',
        keywords: ['light', 'lighting', 'lutron', 'caseta', 'dimm', 'lamp', 'switch', 'scene'],
        description: 'Automated lighting control with preset scenes, dimming, and color tuning for every room in your home.',
        duration: '2 hours per room'
      },
      'security-cameras': {
        name: 'Security & Cameras',
        keywords: ['security', 'camera', 'cctv', 'surveillance', 'monitor', 'ring', 'luma', 'alarm', 'protect'],
        description: 'Professional surveillance system installation with 24/7 monitoring, smart alerts, and cloud backup.',
        duration: '4-6 hours (4-6 cameras)'
      },
      'climate-control': {
        name: 'Climate Control',
        keywords: ['climate', 'thermostat', 'hvac', 'heat', 'cool', 'air', 'temperature', 'nest', 'honeywell', 'ac'],
        description: 'Intelligent HVAC automation with smart thermostats, zoning, and energy optimization.',
        duration: '1.5 hours'
      },
      'full-automation': {
        name: 'Full Home Automation',
        keywords: ['full', 'whole', 'complete', 'control4', 'everything', 'entire', 'total', 'whole house'],
        description: 'Complete Control4 and Lutron systems integration for unified home control across all systems.',
        duration: '8+ hours (multi-day for large homes)'
      }
    },

    // Intent keywords for natural language understanding
    intents: {
      quote: ['quote', 'price', 'cost', 'how much', 'pricing', 'estimate', 'rate', 'afford', 'budget', 'expensive', 'cheap', 'free quote', 'consultation'],
      booking: ['book', 'schedule', 'appointment', 'visit', 'come out', 'come by', 'service call', 'available', 'when can', 'set up a time', 'meet'],
      services: ['services', 'what do you', 'what can you', 'offer', 'options', 'help with', 'do you do', 'provide', 'work on', 'specialize'],
      contact: ['contact', 'reach', 'call', 'phone', 'email', 'talk to', 'speak', 'get in touch', 'message'],
      hours: ['hours', 'open', 'close', 'business hours', 'when are you', 'availability', 'weekend', 'saturday', 'sunday'],
      location: ['location', 'where', 'area', 'sarasota', 'manatee', 'charlotte', 'address', 'service area', 'near me', 'local'],
      greeting: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'sup', 'yo', 'howdy', 'whats up'],
      thanks: ['thank', 'thanks', 'appreciate', 'awesome', 'great', 'perfect', 'cool', 'sounds good'],
      troubleshoot: ['problem', 'issue', 'broken', 'not working', 'fix', 'repair', 'trouble', 'help', 'support', 'stopped', 'wont work', 'malfunction']
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
              <div class="ata-chat-header-left">
                <div class="ata-chat-status-dot"></div>
                <div>
                  <div class="ata-chat-title">All Things Automated</div>
                  <div class="ata-chat-subtitle">Smart Home Experts</div>
                </div>
              </div>
              <button class="ata-chat-close" id="ata-chat-close" aria-label="Close chat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div class="ata-chat-messages" id="ata-chat-messages"></div>

            <div class="ata-chat-suggestions" id="ata-chat-suggestions"></div>

            <div class="ata-chat-input-bar" id="ata-chat-input-bar">
              <input type="text" id="ata-chat-input" class="ata-chat-text-input" placeholder="Type a message..." maxlength="500" autocomplete="off">
              <button class="ata-chat-send-btn" id="ata-chat-send-btn" aria-label="Send message">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>

            <div class="ata-chat-footer">Powered by All Things Automated</div>
          </div>
        </div>
      `;
    },

    attachEventListeners() {
      const toggle = document.getElementById('ata-chat-toggle');
      const close = document.getElementById('ata-chat-close');
      const sendBtn = document.getElementById('ata-chat-send-btn');
      const input = document.getElementById('ata-chat-input');

      toggle.addEventListener('click', () => this.toggleChat());
      close.addEventListener('click', () => this.closeChat());
      sendBtn.addEventListener('click', () => this.handleUserInput());
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleUserInput();
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

      if (this.state.messages.length === 0) {
        this.showGreeting();
      }

      setTimeout(() => {
        this.scrollToBottom();
        document.getElementById('ata-chat-input').focus();
      }, 100);
    },

    closeChat() {
      this.state.isOpen = false;
      const chatWindow = document.getElementById('ata-chat-window');
      const toggle = document.getElementById('ata-chat-toggle');

      chatWindow.style.display = 'none';
      toggle.classList.remove('active');
    },

    showGreeting() {
      this.addMessage('bot', "Welcome to All Things Automated! I'm here to help with smart home automation, lighting, security, and more.");
      setTimeout(() => {
        this.addMessage('bot', "How can I help you today? You can type a message or choose an option below.");
        this.showSuggestions([
          { text: 'Get a Free Quote', action: 'quote' },
          { text: 'Book a Service Call', action: 'booking' },
          { text: 'Our Services', action: 'services' },
          { text: 'Contact Us', action: 'contact' }
        ]);
      }, 400);
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
      messageEl.className = 'ata-message ata-message-' + message.sender;

      // Support links in bot messages
      if (message.sender === 'bot' && message.text.includes('<a ')) {
        messageEl.innerHTML = message.text;
      } else {
        messageEl.textContent = message.text;
      }

      messagesContainer.appendChild(messageEl);
    },

    showSuggestions(suggestions) {
      const suggestionsArea = document.getElementById('ata-chat-suggestions');
      suggestionsArea.innerHTML = '';

      const container = document.createElement('div');
      container.className = 'ata-suggestions-row';

      suggestions.forEach(s => {
        const btn = document.createElement('button');
        btn.className = 'ata-suggestion-btn';
        btn.textContent = s.text;
        btn.addEventListener('click', () => {
          this.addMessage('user', s.text);
          this.clearSuggestions();
          this.handleAction(s.action);
        });
        container.appendChild(btn);
      });

      suggestionsArea.appendChild(container);
    },

    clearSuggestions() {
      const suggestionsArea = document.getElementById('ata-chat-suggestions');
      if (suggestionsArea) suggestionsArea.innerHTML = '';
    },

    // Main input handler -- routes free text through NLP or collects form data
    handleUserInput() {
      const input = document.getElementById('ata-chat-input');
      const text = input.value.trim();
      if (!text) return;

      input.value = '';
      this.addMessage('user', text);
      this.clearSuggestions();

      // If we're collecting a specific field, handle that first
      if (this.state.collectingField) {
        this.handleFieldCollection(text);
        return;
      }

      // Otherwise, run NLP intent detection
      this.processNaturalLanguage(text);
    },

    // Natural language processing -- detect intent from free text
    processNaturalLanguage(text) {
      const lower = text.toLowerCase().replace(/[^a-z0-9\s]/g, '');

      // Check if they mentioned a specific service
      const matchedService = this.detectService(lower);

      // Detect intent
      const intent = this.detectIntent(lower);

      // Route based on intent
      if (intent === 'greeting') {
        this.respondGreeting();
      } else if (intent === 'thanks') {
        this.respondThanks();
      } else if (intent === 'quote') {
        if (matchedService) {
          this.state.selectedService = matchedService;
          this.addMessage('bot', 'Great choice! Let me get you a quote for ' + this.services[matchedService].name + '. What is your name?');
          this.state.collectingField = 'name';
          this.updatePlaceholder('Your name');
        } else {
          this.startQuoteFlow();
        }
      } else if (intent === 'booking') {
        this.startBookingFlow();
      } else if (intent === 'services') {
        if (matchedService) {
          this.showSingleService(matchedService);
        } else {
          this.showServicesInfo();
        }
      } else if (intent === 'contact') {
        this.showContactInfo();
      } else if (intent === 'hours') {
        this.respondHours();
      } else if (intent === 'location') {
        this.respondLocation();
      } else if (intent === 'troubleshoot') {
        this.respondTroubleshoot();
      } else if (matchedService) {
        // They mentioned a service but no clear intent -- give info and offer quote
        this.showSingleService(matchedService);
      } else {
        // Fallback -- be helpful
        this.respondFallback(text);
      }
    },

    detectIntent(text) {
      let bestIntent = null;
      let bestScore = 0;

      for (const [intent, keywords] of Object.entries(this.intents)) {
        let score = 0;
        for (const keyword of keywords) {
          if (text.includes(keyword)) {
            score += keyword.split(' ').length; // Multi-word matches score higher
          }
        }
        if (score > bestScore) {
          bestScore = score;
          bestIntent = intent;
        }
      }

      return bestScore > 0 ? bestIntent : null;
    },

    detectService(text) {
      let bestService = null;
      let bestScore = 0;

      for (const [key, service] of Object.entries(this.services)) {
        let score = 0;
        for (const keyword of service.keywords) {
          if (text.includes(keyword)) {
            score++;
          }
        }
        if (score > bestScore) {
          bestScore = score;
          bestService = key;
        }
      }

      return bestScore > 0 ? bestService : null;
    },

    // Response handlers for each intent
    respondGreeting() {
      const greetings = [
        "Hey! Thanks for reaching out to All Things Automated. What can I help you with today?",
        "Hello! Welcome to All Things Automated. Looking for smart home solutions?",
        "Hi there! How can All Things Automated help you today?"
      ];
      this.addMessage('bot', greetings[Math.floor(Math.random() * greetings.length)]);
      this.showSuggestions([
        { text: 'Get a Free Quote', action: 'quote' },
        { text: 'Book a Service Call', action: 'booking' },
        { text: 'Our Services', action: 'services' }
      ]);
    },

    respondThanks() {
      this.addMessage('bot', "You're welcome! Is there anything else I can help with?");
      this.showSuggestions([
        { text: 'Get a Free Quote', action: 'quote' },
        { text: 'Our Services', action: 'services' },
        { text: "That's all", action: 'goodbye' }
      ]);
    },

    respondHours() {
      this.addMessage('bot', 'All Things Automated is available Monday through Friday, 8:00 AM to 5:00 PM. We serve the Sarasota, Manatee, and Charlotte County areas.');
      this.showSuggestions([
        { text: 'Book a Service Call', action: 'booking' },
        { text: 'Get a Free Quote', action: 'quote' },
        { text: 'Contact Us', action: 'contact' }
      ]);
    },

    respondLocation() {
      this.addMessage('bot', 'We are based in Sarasota, FL and serve the entire Sarasota, Manatee, and Charlotte County areas. All service calls are on-site at your location.');
      this.showSuggestions([
        { text: 'Book a Service Call', action: 'booking' },
        { text: 'Get a Free Quote', action: 'quote' }
      ]);
    },

    respondTroubleshoot() {
      this.addMessage('bot', "Sorry to hear you are having trouble with your system. We can schedule a troubleshooting visit to diagnose and resolve the issue.");
      this.addMessage('bot', 'A service call is $' + this.config.serviceCallFee + ' and includes a full system assessment plus a binding quote on any repairs needed.');
      this.showSuggestions([
        { text: 'Book a Service Call', action: 'booking' },
        { text: 'Contact Us', action: 'contact' },
        { text: 'Get a Quote', action: 'quote' }
      ]);
    },

    respondFallback(originalText) {
      this.addMessage('bot', "I appreciate you reaching out! I can help you with getting a quote, booking a service call, learning about our smart home services, or getting in touch with our team. What would you like to do?");
      this.showSuggestions([
        { text: 'Get a Free Quote', action: 'quote' },
        { text: 'Book a Service Call', action: 'booking' },
        { text: 'Our Services', action: 'services' },
        { text: 'Contact Us', action: 'contact' }
      ]);
    },

    showSingleService(serviceKey) {
      const service = this.services[serviceKey];
      this.addMessage('bot', service.name + ': ' + service.description);
      this.addMessage('bot', 'Typical install time: ' + service.duration + '. Want a free quote for this?');
      this.showSuggestions([
        { text: 'Get a Quote for This', action: 'quote-' + serviceKey },
        { text: 'Book a Service Call', action: 'booking' },
        { text: 'See All Services', action: 'services' }
      ]);
    },

    // Action router -- called by suggestion buttons and internal routing
    handleAction(action) {
      if (action === 'quote') {
        this.startQuoteFlow();
      } else if (action.startsWith('quote-')) {
        const serviceKey = action.replace('quote-', '');
        this.state.selectedService = serviceKey;
        this.addMessage('bot', 'Let me get you a quote for ' + this.services[serviceKey].name + '. What is your name?');
        this.state.collectingField = 'name';
        this.updatePlaceholder('Your name');
      } else if (action === 'booking') {
        this.startBookingFlow();
      } else if (action === 'services') {
        this.showServicesInfo();
      } else if (action === 'contact') {
        this.showContactInfo();
      } else if (action === 'open-booking') {
        this.openBookingLink();
      } else if (action === 'restart') {
        this.restartChat();
      } else if (action === 'goodbye') {
        this.addMessage('bot', 'Thanks for chatting with All Things Automated! Feel free to come back anytime.');
      } else if (action.startsWith('service-')) {
        const serviceKey = action.replace('service-', '');
        this.handleServiceSelection(serviceKey);
      }
    },

    startQuoteFlow() {
      this.addMessage('bot', 'Which service are you most interested in?');
      this.showSuggestions([
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
      this.addMessage('bot', 'Great! Let me get you a quote for ' + serviceName + '. What is your name?');
      this.state.collectingField = 'name';
      this.updatePlaceholder('Your name');
    },

    // Sequential field collection
    handleFieldCollection(text) {
      const field = this.state.collectingField;

      if (field === 'name') {
        if (text.length < 2) {
          this.addMessage('bot', 'Please enter your full name.');
          return;
        }
        this.state.userName = text;
        this.addMessage('bot', 'Thanks, ' + text + '! What is your email address?');
        this.state.collectingField = 'email';
        this.updatePlaceholder('your@email.com');

      } else if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(text)) {
          this.addMessage('bot', 'That does not look like a valid email. Please try again.');
          return;
        }
        this.state.userEmail = text;
        this.addMessage('bot', 'Got it! And your phone number?');
        this.state.collectingField = 'phone';
        this.updatePlaceholder('(941) 555-1234');

      } else if (field === 'phone') {
        const digits = text.replace(/\D/g, '');
        if (digits.length < 10) {
          this.addMessage('bot', 'Please enter a valid 10-digit phone number.');
          return;
        }
        this.state.userPhone = text;
        this.state.collectingField = null;
        this.updatePlaceholder('Type a message...');
        this.submitLead();
      }
    },

    updatePlaceholder(text) {
      const input = document.getElementById('ata-chat-input');
      if (input) {
        input.placeholder = text;
        input.focus();
      }
    },

    submitLead() {
      this.addMessage('bot', 'Submitting your quote request...');

      const serviceName = this.state.selectedService ? this.services[this.state.selectedService].name : 'General Inquiry';

      const payload = {
        name: this.state.userName,
        email: this.state.userEmail,
        phone: this.state.userPhone,
        service: serviceName,
        source: 'chatbot',
        sessionId: this.state.sessionId
      };

      fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (response.ok) {
            this.addMessage('bot', "Your quote request has been submitted. Our team will review your details and get back to you shortly with a customized quote for " + serviceName + ".");

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

            this.showSuggestions([
              { text: 'Our Services', action: 'services' },
              { text: 'Book a Service Call', action: 'booking' },
              { text: 'Start Over', action: 'restart' }
            ]);
          } else {
            throw new Error('Server error');
          }
        })
        .catch(function() {
          this.addMessage('bot', 'There was an issue submitting your request. Please call us at ' + this.config.businessPhone + ' or try again.');
          this.showSuggestions([
            { text: 'Contact Us', action: 'contact' },
            { text: 'Try Again', action: 'quote' }
          ]);
        }.bind(this));
    },

    startBookingFlow() {
      this.addMessage('bot', 'A professional service call is $' + this.config.serviceCallFee + ' and includes a full smart home assessment, personalized recommendations, and a binding quote on any work needed.');

      setTimeout(() => {
        this.addMessage('bot', 'Our availability is Monday through Friday, 8:00 AM to 5:00 PM. Ready to book?');
        this.showSuggestions([
          { text: 'Book Now', action: 'open-booking' },
          { text: 'Get a Free Quote First', action: 'quote' },
          { text: 'Back to Menu', action: 'restart' }
        ]);
      }, 400);

      this.state.currentScreen = 'booking';
    },

    openBookingLink() {
      if (this.config.squareBookingUrl === 'SQUARE_BOOKING_URL') {
        this.addMessage('bot', 'Our online booking system is being set up. In the meantime, you can reach us at ' + this.config.businessPhone + ' or ' + this.config.businessEmail + ' to schedule your service call.');
      } else {
        window.open(this.config.squareBookingUrl, '_blank');
        this.addMessage('bot', 'Opening the booking system in a new window. Select a date and time that works best for you.');
      }

      setTimeout(() => {
        this.showSuggestions([
          { text: 'Contact Us', action: 'contact' },
          { text: 'Back to Menu', action: 'restart' }
        ]);
      }, 500);
    },

    showServicesInfo() {
      this.addMessage('bot', 'All Things Automated offers:');

      setTimeout(() => {
        Object.entries(this.services).forEach(([key, service], i) => {
          setTimeout(() => {
            this.addMessage('bot', service.name + ' - ' + service.description);
          }, i * 300);
        });

        setTimeout(() => {
          this.addMessage('bot', 'Interested in any of these? Just ask or pick one below.');
          this.showSuggestions([
            { text: 'Smart Lighting', action: 'quote-smart-lighting' },
            { text: 'Security & Cameras', action: 'quote-security-cameras' },
            { text: 'Climate Control', action: 'quote-climate-control' },
            { text: 'Full Automation', action: 'quote-full-automation' }
          ]);
        }, 1400);
      }, 300);

      this.state.currentScreen = 'services';
    },

    showContactInfo() {
      this.addMessage('bot', 'Here is how to reach All Things Automated:');
      this.addMessage('bot', 'Phone: <a href="tel:+19412635325" style="color:#3A7FC1">' + this.config.businessPhone + '</a>');
      this.addMessage('bot', 'Email: <a href="mailto:' + this.config.businessEmail + '" style="color:#3A7FC1">' + this.config.businessEmail + '</a>');
      this.addMessage('bot', 'Hours: Monday - Friday, 8:00 AM - 5:00 PM');
      this.addMessage('bot', 'Service Area: Sarasota, Manatee & Charlotte Counties');

      setTimeout(() => {
        this.showSuggestions([
          { text: 'Get a Free Quote', action: 'quote' },
          { text: 'Book a Service Call', action: 'booking' },
          { text: 'Our Services', action: 'services' }
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
      this.state.collectingField = null;
      this.state.messages = [];

      document.getElementById('ata-chat-messages').innerHTML = '';
      this.clearSuggestions();
      this.updatePlaceholder('Type a message...');
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
          height: 620px;
          background: ${this.config.darkBg};
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 1px rgba(0, 0, 0, 0.3);
          display: none;
          flex-direction: column;
          border: 1px solid ${this.config.borderColor};
          animation: ataSlideUp 0.3s ease;
        }

        @keyframes ataSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ata-chat-header {
          background: linear-gradient(135deg, ${this.config.darkBg}, #1a1f26);
          padding: 16px 20px;
          border-bottom: 1px solid ${this.config.borderColor};
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 16px 16px 0 0;
        }

        .ata-chat-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ata-chat-status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
          flex-shrink: 0;
        }

        .ata-chat-title {
          color: ${this.config.lightText};
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.3px;
          line-height: 1.2;
        }

        .ata-chat-subtitle {
          color: #888;
          font-size: 12px;
          font-weight: 400;
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

        .ata-chat-close:hover { opacity: 0.7; }

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
          gap: 10px;
        }

        .ata-message {
          animation: ataFadeIn 0.3s ease;
          word-wrap: break-word;
        }

        @keyframes ataFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ata-message-bot {
          background: ${this.config.borderColor};
          color: ${this.config.lightText};
          padding: 10px 14px;
          border-radius: 12px;
          border-bottom-left-radius: 4px;
          max-width: 85%;
          font-size: 14px;
          line-height: 1.5;
          align-self: flex-start;
        }

        .ata-message-bot a {
          color: ${this.config.primaryColor};
          text-decoration: none;
        }

        .ata-message-bot a:hover { text-decoration: underline; }

        .ata-message-user {
          background: ${this.config.primaryColor};
          color: ${this.config.lightText};
          padding: 10px 14px;
          border-radius: 12px;
          border-bottom-right-radius: 4px;
          max-width: 85%;
          font-size: 14px;
          line-height: 1.5;
          align-self: flex-end;
        }

        .ata-chat-suggestions {
          padding: 0 16px;
          min-height: 0;
        }

        .ata-suggestions-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 8px 0;
        }

        .ata-suggestion-btn {
          background: none;
          border: 1px solid ${this.config.primaryColor};
          color: ${this.config.primaryColor};
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .ata-suggestion-btn:hover {
          background: ${this.config.primaryColor};
          color: ${this.config.lightText};
        }

        .ata-chat-input-bar {
          padding: 12px 16px;
          border-top: 1px solid ${this.config.borderColor};
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .ata-chat-text-input {
          flex: 1;
          background: ${this.config.borderColor};
          border: 1px solid ${this.config.borderColor};
          color: ${this.config.lightText};
          padding: 10px 14px;
          border-radius: 24px;
          font-size: 14px;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .ata-chat-text-input:focus {
          outline: none;
          border-color: ${this.config.primaryColor};
          background: rgba(58, 127, 193, 0.05);
        }

        .ata-chat-text-input::placeholder { color: #666; }

        .ata-chat-send-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: ${this.config.primaryColor};
          border: none;
          color: ${this.config.lightText};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
          padding: 0;
        }

        .ata-chat-send-btn:hover {
          background: #2a6aa8;
          transform: scale(1.05);
        }

        .ata-chat-send-btn svg {
          width: 18px;
          height: 18px;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .ata-chat-footer {
          padding: 10px 20px;
          font-size: 11px;
          color: #555;
          text-align: center;
          border-top: 1px solid ${this.config.borderColor};
          background: rgba(13, 17, 23, 0.5);
          border-radius: 0 0 16px 16px;
        }

        .ata-chat-messages::-webkit-scrollbar { width: 6px; }
        .ata-chat-messages::-webkit-scrollbar-track { background: transparent; }
        .ata-chat-messages::-webkit-scrollbar-thumb { background: ${this.config.borderColor}; border-radius: 3px; }
        .ata-chat-messages::-webkit-scrollbar-thumb:hover { background: ${this.config.primaryColor}; }

        @media (max-width: 480px) {
          .ata-chat-window {
            width: calc(100vw - 20px);
            height: calc(100vh - 100px);
            max-height: 620px;
            right: 10px;
            bottom: 80px;
          }
          .ata-message-bot, .ata-message-user { max-width: 100%; }
          .ata-suggestions-row { flex-wrap: wrap; }
        }
      `;

      document.head.appendChild(style);
    }
  };

  // Expose global reference
  window.ATAChatbot = ATAChatbot;

  // Public API
  ATAChatbot.open = function() {
    if (!this.state.isOpen) {
      this.openChat();
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { ATAChatbot.init(); });
  } else {
    ATAChatbot.init();
  }
})();
