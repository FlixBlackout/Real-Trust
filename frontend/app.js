// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Load Projects from API
async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const projects = await response.json();
        
        const projectsContainer = document.getElementById('projectsContainer');
        
        if (projects.length === 0) {
            projectsContainer.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No projects available at the moment.</p></div>';
            return;
        }
        
        projectsContainer.innerHTML = projects.map(project => `
            <div class="col-md-6 col-lg-4">
                <div class="project-card">
                    <img src="${API_BASE_URL.replace('/api', '')}/uploads/${project.image}" class="img-fluid w-100" alt="${project.name}" style="height: 250px; object-fit: cover;">
                    <div class="p-4">
                        <h5 class="text-primary">${project.name}</h5>
                        <p class="text-muted">${project.description}</p>
                        <button class="btn btn-secondary rounded-pill py-2 px-4">Read More</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projectsContainer').innerHTML = 
            '<div class="col-12 text-center"><p class="text-danger">Failed to load projects. Please try again later.</p></div>';
    }
}

// Load Clients/Testimonials from API
async function loadClients() {
    try {
        const response = await fetch(`${API_BASE_URL}/clients`);
        const clients = await response.json();
        
        const clientsContainer = document.getElementById('clientsContainer');
        
        if (clients.length === 0) {
            clientsContainer.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No testimonials available at the moment.</p></div>';
            return;
        }
        
        clientsContainer.innerHTML = clients.map(client => `
            <div class="col-md-6 col-lg-4 col-xl-2">
                <div class="client-testimonial">
                    <img src="${API_BASE_URL.replace('/api', '')}/uploads/${client.image}" alt="${client.name}">
                    <p class="text-muted">${client.description}</p>
                    <h6 class="client-name">${client.name}</h6>
                    <p class="client-designation">${client.designation}</p>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading clients:', error);
        document.getElementById('clientsContainer').innerHTML = 
            '<div class="col-12 text-center"><p class="text-danger">Failed to load testimonials. Please try again later.</p></div>';
    }
}

// Submit Contact Form
async function submitContactForm(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Thank you for contacting us! We will get back to you soon.');
            return true;
        } else {
            throw new Error('Failed to submit form');
        }
    } catch (error) {
        console.error('Error submitting contact form:', error);
        alert('Failed to submit form. Please try again later.');
        return false;
    }
}

// Submit Newsletter Subscription
async function subscribeNewsletter(email) {
    try {
        const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        
        if (response.ok) {
            alert('Successfully subscribed to our newsletter!');
            return true;
        } else if (response.status === 409) {
            alert('This email is already subscribed.');
            return false;
        } else {
            throw new Error('Failed to subscribe');
        }
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        alert('Failed to subscribe. Please try again later.');
        return false;
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Load projects and clients
    loadProjects();
    loadClients();
    
    // Handle hero contact form submission
    const heroContactForm = document.getElementById('heroContactForm');
    if (heroContactForm) {
        heroContactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                fullName: this.fullName.value,
                email: this.email.value,
                mobileNumber: this.mobileNumber.value,
                city: this.city.value
            };
            
            const success = await submitContactForm(formData);
            if (success) {
                this.reset();
            }
        });
    }
    
    // Handle main contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                fullName: this.fullName.value,
                email: this.email.value,
                mobileNumber: this.mobileNumber.value,
                city: this.city.value
            };
            
            const success = await submitContactForm(formData);
            if (success) {
                this.reset();
            }
        });
    }
    
    // Handle newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletterEmail').value;
            const success = await subscribeNewsletter(email);
            if (success) {
                document.getElementById('newsletterEmail').value = '';
            }
        });
    }
});
