// Timeline Data
const stepsData = [
    {"title":"Initial Inspection", "img":"./assets/steps/initialInspection.png", "video":"./videos/initialInspection.mp4"},
    {"title":"Remove Worn Lining", "img":"./assets/steps/rmvWornLining.png", "video":"./videos/rmvWornLining.mp4"},
    {"title":"Surface Preparation", "img":"./assets/steps/surfacePerparation.png", "video":"./videos/surfacePreparation.mp4"},
    {"title":"Tinning Process", "img":"./assets/steps/tinningProcess.png", "video":"./videos/tinningProcess.mp4"},
    {"title":"Tinning Complete", "img":"./assets/steps/tinningComplete.png", "video":"./videos/tinningComplete.mp4"},
    {"title":"Proof Machining", "img":"./assets/steps/proofMachining.png", "video":"./videos/proofMachining.mp4"},
    {"title":"Centrifugal Casting", "img":"./assets/steps/centrifugalCasting.png", "video":"./videos/centrifugalCasting.mp4"},
    {"title":"Ultrasonic NDT", "img":"./assets/steps/ultrasonicNDT.png", "video":"./videos/ultrasonicNDT.mp4"},
    {"title":"Final Machining", "img":"./assets/steps/finalMachining.png", "video":"./videos/finalMachining.mp4"},
    {"title":"Dye-Penetrant NDT", "img":"./assets/steps/dyePenetrantNDT.png", "video":"./videos/dyePenetrantNDT.mp4"},
    {"title":"Dimensional Inspection", "img":"./assets/steps/dimensionalInspection.png", "video":"./videos/dimensionalInspection.mp4"},
    {"title":"Ready for Packing", "img":"./assets/steps/ready4Packing.png", "video":"./videos/readyForPacking.mp4"}
  ];
  
  // DOM Elements
  const timelineEl = document.getElementById('timeline');
  const modal = document.getElementById('videoModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalVideo = document.getElementById('modalVideo');
  const closeModalBtns = document.querySelectorAll('[data-close-modal]');
  
  // Initialize the application
  document.addEventListener('DOMContentLoaded', function() {
    initializeTimeline();
    setupModalEvents();
    requestFullscreen();
  });
  
  // Create and render the timeline steps
  function initializeTimeline() {
    stepsData.forEach((step, index) => {
      const stepEl = createTimelineStep(step, index);
      timelineEl.appendChild(stepEl);
    });
  }
  
  // Create a single timeline step element
  function createTimelineStep(step, index) {
    const stepEl = document.createElement('div');
    stepEl.className = 'timeline-step';
    
    const contentEl = document.createElement('div');
    contentEl.className = 'step-content';
    
    const circleEl = document.createElement('button');
    circleEl.className = 'step-circle';
    circleEl.setAttribute('aria-label', `View video about ${step.title}`);
    circleEl.setAttribute('data-step-index', index);
    
    const imgEl = document.createElement('img');
    imgEl.src = step.img;
    imgEl.alt = `${step.title} process step`;
    imgEl.loading = 'lazy';
    
    const titleEl = document.createElement('div');
    titleEl.className = 'step-title';
    titleEl.textContent = step.title;
    
    circleEl.appendChild(imgEl);
    contentEl.appendChild(titleEl);
    
    stepEl.appendChild(circleEl);
    stepEl.appendChild(contentEl);
    
    // Add event listener to circle button
    circleEl.addEventListener('click', () => {
      openModal(step);
    });
    
    return stepEl;
  }
  
  // Open modal with specified video
  function openModal(step) {
    // Pause page scrolling
    document.body.style.overflow = 'hidden';
    
    // Update modal content
    modalTitle.textContent = step.title;
    modalVideo.src = step.video;
    
    // Show modal
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus on the first focusable element in the modal
    setTimeout(() => {
      closeModalBtns[0].focus();
    }, 100);
    
    // Start video playback
    modalVideo.play().catch(err => {
      console.warn('Video autoplay failed:', err);
    });
    
    // Set up focus trap
    setupFocusTrap();
  }
  
  // Close the modal
  function closeModal() {
    // Restore scrolling
    document.body.style.overflow = '';
    
    // Hide modal
    modal.setAttribute('aria-hidden', 'true');
    
    // Pause the video
    modalVideo.pause();
    
    // Return focus to the element that opened the modal
    const activeStepIndex = modalVideo.dataset.activeStepIndex;
    if (activeStepIndex) {
      const stepBtn = document.querySelector(`.step-circle[data-step-index="${activeStepIndex}"]`);
      if (stepBtn) {
        stepBtn.focus();
      }
    }
  }
  
  // Set up modal events
  function setupModalEvents() {
    // Close modal when close button or overlay is clicked
    closeModalBtns.forEach(btn => {
      btn.addEventListener('click', closeModal);
    });
    
    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        closeModal();
      }
    });
    
    // When video ends, focus on close button
    modalVideo.addEventListener('ended', function() {
      closeModalBtns[0].focus();
    });
  }
  
  // Focus trap inside modal
  function setupFocusTrap() {
    const focusableElements = modal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    modal.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        // If SHIFT + TAB
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } 
        // If just TAB
        else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }
  
  // Request fullscreen mode
  function requestFullscreen() {
    document.addEventListener('click', function() {
      const docEl = document.documentElement;
      
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        docEl.mozRequestFullScreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
    }, { once: true });
    
    // For touch screens
    document.addEventListener('touchend', function() {
      const docEl = document.documentElement;
      
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        docEl.mozRequestFullScreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
    }, { once: true });
  }