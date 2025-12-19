// API Configuration
// Use environment-based URL for production deployment
const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8080/api'
    : 'https://realtrust-backend.onrender.com/api';  // Update this after deploying backend

// Image Cropper Variables
let cropper = null;
let currentImageInput = null;
let currentCropConfig = null;

// Crop configurations for different image types
const CROP_CONFIGS = {
    project: { width: 800, height: 600, aspectRatio: 4/3 },
    client: { width: 300, height: 300, aspectRatio: 1 },
    general: { width: 1200, height: 800, aspectRatio: 3/2 }
};

// Initialize Image Cropper
function initImageCropper(input, type = 'general') {
    const file = input.files[0];
    if (!file || !file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
    }
    
    currentImageInput = input;
    currentCropConfig = CROP_CONFIGS[type];
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const image = document.getElementById('cropperImage');
        image.src = e.target.result;
        
        // Show target size
        document.getElementById('targetSize').textContent = 
            `${currentCropConfig.width} x ${currentCropConfig.height} px`;
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('cropperModal'));
        modal.show();
        
        // Initialize cropper after modal is shown
        document.getElementById('cropperModal').addEventListener('shown.bs.modal', function() {
            if (cropper) {
                cropper.destroy();
            }
            
            cropper = new Cropper(image, {
                aspectRatio: currentCropConfig.aspectRatio,
                viewMode: 1,
                responsive: true,
                autoCropArea: 1,
                background: false,
                guides: true,
                center: true,
                highlight: true,
                cropBoxResizable: true,
                cropBoxMovable: true,
                dragMode: 'move'
            });
        }, { once: true });
    };
    
    reader.readAsDataURL(file);
}

// Apply Crop and get resized image
function applyCrop() {
    if (!cropper) return;
    
    const canvas = cropper.getCroppedCanvas({
        width: currentCropConfig.width,
        height: currentCropConfig.height,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
    });
    
    canvas.toBlob(function(blob) {
        // Create a new File object from the blob
        const fileName = currentImageInput.files[0].name;
        const croppedFile = new File([blob], fileName, { type: 'image/jpeg' });
        
        // Create a new FileList-like object
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(croppedFile);
        currentImageInput.files = dataTransfer.files;
        
        // Show preview
        showImagePreview(currentImageInput);
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('cropperModal')).hide();
        
        // Destroy cropper
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }
    }, 'image/jpeg', 0.9);
}

// Show image preview after cropping
function showImagePreview(input) {
    const previewId = input.id + 'Preview';
    let preview = document.getElementById(previewId);
    
    if (!preview) {
        preview = document.createElement('img');
        preview.id = previewId;
        preview.className = 'img-thumbnail mt-2';
        preview.style.maxWidth = '200px';
        input.parentElement.appendChild(preview);
    }
    
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Navigation Handler
document.addEventListener('DOMContentLoaded', function() {
    // Handle sidebar navigation
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.sidebar .nav-link').forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            document.querySelectorAll('.section-content').forEach(section => section.classList.remove('active'));
            // Show selected section
            const sectionId = this.dataset.section;
            document.getElementById(sectionId).classList.add('active');
            
            // Load data for the section
            loadSectionData(sectionId);
        });
    });
    
    // Initialize dashboard
    loadDashboard();
    loadProjects();
    
    // Form submissions
    document.getElementById('addProjectForm').addEventListener('submit', handleAddProject);
    document.getElementById('addClientForm').addEventListener('submit', handleAddClient);
});

// Load Dashboard Data
async function loadDashboard() {
    try {
        const [projects, clients, contacts, newsletter] = await Promise.all([
            fetch(`${API_BASE_URL}/projects`).then(r => r.json()),
            fetch(`${API_BASE_URL}/clients`).then(r => r.json()),
            fetch(`${API_BASE_URL}/contact`).then(r => r.json()),
            fetch(`${API_BASE_URL}/newsletter`).then(r => r.json())
        ]);
        
        document.getElementById('totalProjects').textContent = projects.length;
        document.getElementById('totalClients').textContent = clients.length;
        document.getElementById('totalContacts').textContent = contacts.length;
        document.getElementById('totalSubscribers').textContent = newsletter.length;
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Load Section Data
function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'projects':
            loadProjects();
            break;
        case 'clients':
            loadClients();
            break;
        case 'contacts':
            loadContacts();
            break;
        case 'newsletter':
            loadNewsletter();
            break;
    }
}

// ========== PROJECTS ==========

async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const projects = await response.json();
        
        const projectsList = document.getElementById('projectsList');
        
        if (projects.length === 0) {
            projectsList.innerHTML = '<tr><td colspan="4" class="text-center">No projects found</td></tr>';
            return;
        }
        
        projectsList.innerHTML = projects.map(project => `
            <tr>
                <td><img src="${API_BASE_URL.replace('/api', '')}/uploads/${project.image}" class="preview-image" alt="${project.name}"></td>
                <td>${project.name}</td>
                <td>${project.description.substring(0, 100)}...</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteProject('${project.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projectsList').innerHTML = 
            '<tr><td colspan="4" class="text-center text-danger">Error loading projects</td></tr>';
    }
}

async function handleAddProject(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch(`${API_BASE_URL}/projects`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('Project added successfully!');
            e.target.reset();
            loadProjects();
            loadDashboard();
        } else {
            throw new Error('Failed to add project');
        }
    } catch (error) {
        console.error('Error adding project:', error);
        alert('Failed to add project. Please try again.');
    }
}

async function deleteProject(id) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Project deleted successfully!');
            loadProjects();
            loadDashboard();
        } else {
            throw new Error('Failed to delete project');
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
    }
}

// ========== CLIENTS ==========

async function loadClients() {
    try {
        const response = await fetch(`${API_BASE_URL}/clients`);
        const clients = await response.json();
        
        const clientsList = document.getElementById('clientsList');
        
        if (clients.length === 0) {
            clientsList.innerHTML = '<tr><td colspan="5" class="text-center">No clients found</td></tr>';
            return;
        }
        
        clientsList.innerHTML = clients.map(client => `
            <tr>
                <td><img src="${API_BASE_URL.replace('/api', '')}/uploads/${client.image}" class="preview-image rounded-circle" alt="${client.name}"></td>
                <td>${client.name}</td>
                <td>${client.designation}</td>
                <td>${client.description.substring(0, 100)}...</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteClient('${client.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading clients:', error);
        document.getElementById('clientsList').innerHTML = 
            '<tr><td colspan="5" class="text-center text-danger">Error loading clients</td></tr>';
    }
}

async function handleAddClient(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch(`${API_BASE_URL}/clients`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('Client added successfully!');
            e.target.reset();
            loadClients();
            loadDashboard();
        } else {
            throw new Error('Failed to add client');
        }
    } catch (error) {
        console.error('Error adding client:', error);
        alert('Failed to add client. Please try again.');
    }
}

async function deleteClient(id) {
    if (!confirm('Are you sure you want to delete this client?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Client deleted successfully!');
            loadClients();
            loadDashboard();
        } else {
            throw new Error('Failed to delete client');
        }
    } catch (error) {
        console.error('Error deleting client:', error);
        alert('Failed to delete client. Please try again.');
    }
}

// ========== CONTACTS ==========

async function loadContacts() {
    try {
        const response = await fetch(`${API_BASE_URL}/contact`);
        const contacts = await response.json();
        
        const contactsList = document.getElementById('contactsList');
        
        if (contacts.length === 0) {
            contactsList.innerHTML = '<tr><td colspan="6" class="text-center">No contact forms found</td></tr>';
            return;
        }
        
        contactsList.innerHTML = contacts.map(contact => `
            <tr>
                <td>${contact.fullName}</td>
                <td>${contact.email}</td>
                <td>${contact.mobileNumber}</td>
                <td>${contact.city}</td>
                <td>${new Date(contact.submittedAt).toLocaleString()}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteContact('${contact.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading contacts:', error);
        document.getElementById('contactsList').innerHTML = 
            '<tr><td colspan="6" class="text-center text-danger">Error loading contacts</td></tr>';
    }
}

async function deleteContact(id) {
    if (!confirm('Are you sure you want to delete this contact form?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Contact form deleted successfully!');
            loadContacts();
            loadDashboard();
        } else {
            throw new Error('Failed to delete contact form');
        }
    } catch (error) {
        console.error('Error deleting contact form:', error);
        alert('Failed to delete contact form. Please try again.');
    }
}

// ========== NEWSLETTER ==========

async function loadNewsletter() {
    try {
        const response = await fetch(`${API_BASE_URL}/newsletter`);
        const subscriptions = await response.json();
        
        const newsletterList = document.getElementById('newsletterList');
        
        if (subscriptions.length === 0) {
            newsletterList.innerHTML = '<tr><td colspan="3" class="text-center">No subscriptions found</td></tr>';
            return;
        }
        
        newsletterList.innerHTML = subscriptions.map(subscription => `
            <tr>
                <td>${subscription.email}</td>
                <td>${new Date(subscription.subscribedAt).toLocaleString()}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteSubscription('${subscription.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading newsletter subscriptions:', error);
        document.getElementById('newsletterList').innerHTML = 
            '<tr><td colspan="3" class="text-center text-danger">Error loading subscriptions</td></tr>';
    }
}

async function deleteSubscription(id) {
    if (!confirm('Are you sure you want to delete this subscription?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/newsletter/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Subscription deleted successfully!');
            loadNewsletter();
            loadDashboard();
        } else {
            throw new Error('Failed to delete subscription');
        }
    } catch (error) {
        console.error('Error deleting subscription:', error);
        alert('Failed to delete subscription. Please try again.');
    }
}
