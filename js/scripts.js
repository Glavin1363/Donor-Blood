document.addEventListener('DOMContentLoaded', function() {
    // Initialize critical cases from localStorage or with sample data
    let criticalCases = JSON.parse(localStorage.getItem('criticalCases')) || [
        {
            id: Date.now(),
            title: "Urgent: O+ Blood Needed",
            description: "Patient undergoing emergency surgery requires O+ blood transfusion within 12 hours.",
            bloodType: "O+",
            organ: "Blood",
            hospital: "City General Hospital",
            location: "New York, NY",
            urgency: "critical",
            timeRemaining: "11 hours 23 minutes",
            donorsNeeded: 5,
            donorsNotified: 10,
            contact: "Dr. Smith - (555) 123-4567",
            caseDetails: "25-year-old male with severe trauma from accident. Requires 4 units of O+ blood for emergency surgery. Cross-match already completed.",
            timestamp: Date.now()
        },
        {
            id: Date.now() + 1,
            title: "Liver Transplant Urgent",
            description: "Patient with acute liver failure needs compatible donor within 24 hours.",
            bloodType: "B-",
            organ: "Liver",
            hospital: "University Medical Center",
            location: "Boston, MA",
            urgency: "urgent",
            timeRemaining: "22 hours 15 minutes",
            donorsNeeded: 1,
            donorsNotified: 3,
            contact: "Dr. Johnson - (555) 987-6543",
            caseDetails: "42-year-old female with acute liver failure from autoimmune hepatitis. MELD score of 35. Compatible with blood type B- donors only.",
            timestamp: Date.now() + 1
        },
        {
            id: Date.now() + 2,
            title: "Kidney Match Needed",
            description: "Patient on dialysis needs kidney transplant within 48 hours.",
            bloodType: "A+",
            organ: "Kidney",
            hospital: "Memorial Hospital",
            location: "Chicago, IL",
            urgency: "high",
            timeRemaining: "45 hours 30 minutes",
            donorsNeeded: 1,
            donorsNotified: 5,
            contact: "Dr. Lee - (555) 456-7890",
            caseDetails: "38-year-old male with end-stage renal disease. Blood type A+, CMV negative. Has been on waiting list for 2 years.",
            timestamp: Date.now() + 2
        }
    ];

    // Save to localStorage
    localStorage.setItem('criticalCases', JSON.stringify(criticalCases));

    // DOM elements
    const casesGrid = document.querySelector('.cases-grid');
    const bloodTypeFilter = document.getElementById('blood-type');
    const organTypeFilter = document.getElementById('organ-type');
    const urgencyFilter = document.getElementById('urgency');
    const caseModal = document.getElementById('caseModal');
    const reportModal = document.getElementById('reportModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const closeBtn = document.getElementById('closeBtn');
    const respondBtn = document.getElementById('respondBtn');
    const reportCaseBtn = document.getElementById('reportCaseBtn');
    const cancelCaseBtn = document.getElementById('cancelCaseBtn');
    const caseForm = document.getElementById('caseForm');
    
    // Stats elements
    const livesSavedEl = document.getElementById('livesSaved');
    const casesMatchedEl = document.getElementById('casesMatched');
    const responseTimeEl = document.getElementById('responseTime');
    const successRateEl = document.getElementById('successRate');

    // Display cases in the grid
    function displayCases(cases) {
        casesGrid.innerHTML = '';
        
        // Sort cases by urgency (critical first)
        cases.sort((a, b) => {
            const urgencyOrder = { critical: 1, urgent: 2, high: 3 };
            return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
        });
        
        cases.forEach(caseItem => {
            const caseCard = document.createElement('div');
            caseCard.className = 'case-card';
            caseCard.dataset.id = caseItem.id;
            
            let urgencyClass = '';
            if (caseItem.urgency === 'critical') urgencyClass = 'urgency-critical';
            else if (caseItem.urgency === 'urgent') urgencyClass = 'urgency-urgent';
            else if (caseItem.urgency === 'high') urgencyClass = 'urgency-high';
            
            caseCard.innerHTML = `
                <div class="case-header">
                    <span class="${urgencyClass}">${caseItem.urgency.toUpperCase()}</span>
                    <span class="blood-type">${caseItem.bloodType}</span>
                </div>
                <div class="case-body">
                    <h3>${caseItem.title}</h3>
                    <p>${caseItem.description}</p>
                    <div class="case-details">
                        <div class="detail-row">
                            <span class="detail-label">Organ/Type:</span>
                            <span class="detail-value">${caseItem.organ}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Hospital:</span>
                            <span class="detail-value">${caseItem.hospital}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Location:</span>
                            <span class="detail-value">${caseItem.location}</span>
                        </div>
                    </div>
                    <div class="time-remaining">
                        <i class="fas fa-clock"></i>
                        <span>${caseItem.timeRemaining} remaining</span>
                    </div>
                </div>
                <div class="case-footer">
                    <span>${caseItem.donorsNotified} donors notified</span>
                </div>
            `;
            
            casesGrid.appendChild(caseCard);
        });
        
        // Add click event to case cards
        document.querySelectorAll('.case-card').forEach(card => {
            card.addEventListener('click', function() {
                const caseId = parseInt(this.dataset.id);
                const selectedCase = cases.find(c => c.id === caseId);
                openModal(selectedCase);
            });
        });
    }

    // Open modal with case details
    function openModal(caseItem) {
        modalTitle.textContent = caseItem.title;
        
        modalBody.innerHTML = `
            <div class="modal-case-details">
                <p><strong>Description:</strong> ${caseItem.description}</p>
                <div class="detail-row">
                    <span class="detail-label">Blood Type:</span>
                    <span class="detail-value">${caseItem.bloodType}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Organ Needed:</span>
                    <span class="detail-value">${caseItem.organ}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Hospital:</span>
                    <span class="detail-value">${caseItem.hospital}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Location:</span>
                    <span class="detail-value">${caseItem.location}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Urgency:</span>
                    <span class="detail-value ${caseItem.urgency === 'critical' ? 'urgency-critical' : caseItem.urgency === 'urgent' ? 'urgency-urgent' : 'urgency-high'}">${caseItem.urgency.toUpperCase()}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Time Remaining:</span>
                    <span class="detail-value">${caseItem.timeRemaining}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Donors Notified:</span>
                    <span class="detail-value">${caseItem.donorsNotified}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Contact:</span>
                    <span class="detail-value">${caseItem.contact}</span>
                </div>
                <div class="case-notes">
                    <h4>Case Details:</h4>
                    <p>${caseItem.caseDetails}</p>
                </div>
            </div>
        `;
        
        caseModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Open report case modal
    function openReportModal() {
        reportModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        caseModal.style.display = 'none';
        reportModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Filter cases based on selected filters
    function filterCases() {
        const bloodType = bloodTypeFilter.value;
        const organType = organTypeFilter.value;
        const urgency = urgencyFilter.value;
        
        let filteredCases = criticalCases;
        
        if (bloodType !== 'all') {
            filteredCases = filteredCases.filter(caseItem => caseItem.bloodType === bloodType);
        }
        
        if (organType !== 'all') {
            filteredCases = filteredCases.filter(caseItem => caseItem.organ.toLowerCase() === organType.toLowerCase());
        }
        
        if (urgency !== 'all') {
            filteredCases = filteredCases.filter(caseItem => caseItem.urgency === urgency);
        }
        
        displayCases(filteredCases);
    }

    // Update stats
    function updateStats() {
        // Calculate stats based on cases
        const totalCases = criticalCases.length;
        const matchedCases = Math.floor(totalCases * 0.8); // 80% match rate for demo
        const avgResponseTime = Math.floor(Math.random() * 60) + 15; // Random between 15-75 mins
        
        // Animate counting up
        animateValue(livesSavedEl, 0, matchedCases * 2, 2000);
        animateValue(casesMatchedEl, 0, matchedCases, 2000);
        animateValue(responseTimeEl, 0, avgResponseTime, 2000);
        animateValue(successRateEl, 0, 94, 2000, true);
    }

    // Animate value counting up
    function animateValue(element, start, end, duration, isPercentage = false) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = isPercentage ? `${value}%` : value; // Fixed template literal
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    

    // Handle form submission
    caseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Create new case object
        const newCase = {
            id: Date.now(),
            title: document.getElementById('caseTitle').value,
            description: document.getElementById('caseDescription').value,
            bloodType: document.getElementById('caseBloodType').value,
            organ: document.getElementById('caseOrgan').value,
            hospital: document.getElementById('caseHospital').value,
            location: document.getElementById('caseLocation').value,
            urgency: document.getElementById('caseUrgency').value,
            timeRemaining: document.getElementById('caseTimeRemaining').value,
            donorsNeeded: parseInt(document.getElementById('caseDonorsNeeded').value),
            donorsNotified: Math.floor(Math.random() * 20) + 5, // Random between 5-25 for demo
            contact: document.getElementById('caseContact').value,
            caseDetails: document.getElementById('caseDetails').value,
            timestamp: Date.now()
        };
        
        // Add to cases array
        criticalCases.push(newCase);
        
        // Save to localStorage
        localStorage.setItem('criticalCases', JSON.stringify(criticalCases));
        
        // Update display
        filterCases();
        updateStats();
        
        // Close modal and reset form
        closeModal();
        caseForm.reset();
        
        // Show success message
        alert('Critical case reported successfully! Donors are being notified.');
    });

    // Event listeners
    bloodTypeFilter.addEventListener('change', filterCases);
    organTypeFilter.addEventListener('change', filterCases);
    urgencyFilter.addEventListener('change', filterCases);
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    closeBtn.addEventListener('click', closeModal);
    respondBtn.addEventListener('click', function() {
        alert('Thank you for responding to this critical case! The medical team will contact you shortly.');
        closeModal();
    });
    
    reportCaseBtn.addEventListener('click', openReportModal);
    cancelCaseBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === caseModal || event.target === reportModal) {
            closeModal();
        }
    });

    // Hamburger menu functionality for mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Initialize
    displayCases(criticalCases);
    updateStats();
    
    // Simulate real-time updates (for demo purposes)
    setInterval(() => {
        // Randomly update donors notified count for demo
        criticalCases = criticalCases.map(caseItem => {
            return {
                ...caseItem,
                donorsNotified: Math.min(
                    caseItem.donorsNotified + Math.floor(Math.random() * 3),
                    caseItem.donorsNeeded * 5
                )
            };
        });
        
        // Save to localStorage
        localStorage.setItem('criticalCases', JSON.stringify(criticalCases));
        
        // Update display
        filterCases();
    }, 10000); // Update every 10 seconds
});