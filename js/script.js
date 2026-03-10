// GODEGODE School Management - Student Registration System
// JavaScript File for Form Handling and Interactions

class StudentManager {
    constructor() {
        this.students = [];
        this.filteredStudents = [];
        this.init();
    }

    init() {
        this.loadStudents();
        this.attachEventListeners();
        this.renderStudents();
    }

    attachEventListeners() {
        const form = document.getElementById('studentForm');
        const searchInput = document.getElementById('searchInput');

        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        searchInput.addEventListener('input', (e) => this.handleSearch(e));
    }

    handleFormSubmit(e) {
        e.preventDefault();

        // Get form values
        const studentName = document.getElementById('studentName').value.trim();
        const studentId = document.getElementById('studentId').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const grade = document.getElementById('grade').value;
        const address = document.getElementById('address').value.trim();

        // Validate form
        if (!this.validateForm(studentName, studentId, email, phone, grade, address)) {
            return;
        }

        // Check for duplicate ID
        if (this.students.some(s => s.id === studentId)) {
            this.showError('idError', 'Student ID already exists!');
            return;
        }

        // Create student object
        const student = {
            id: Date.now().toString(),
            name: studentName,
            studentId: studentId,
            email: email,
            phone: phone,
            grade: grade,
            address: address,
            dateAdded: new Date().toLocaleDateString()
        };

        // Add student
        this.students.push(student);
        this.saveStudents();
        this.renderStudents();

        // Reset form and show success message
        this.resetForm();
        this.showSuccessMessage();

        // Clear errors
        this.clearAllErrors();
    }

    validateForm(name, id, email, phone, grade, address) {
        let isValid = true;

        // Clear all errors first
        this.clearAllErrors();

        // Validate name
        if (name.length < 2) {
            this.showError('nameError', 'Name must be at least 2 characters');
            isValid = false;
        }

        // Validate student ID
        if (id.length < 3) {
            this.showError('idError', 'Student ID must be at least 3 characters');
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate phone
        const phoneRegex = /^[0-9\-\+\(\)\s]+$/;
        if (phone.length < 7 || !phoneRegex.test(phone)) {
            this.showError('phoneError', 'Please enter a valid phone number');
            isValid = false;
        }

        // Validate grade
        if (!grade) {
            this.showError('gradeError', 'Please select a grade');
            isValid = false;
        }

        // Validate address
        if (address.length < 5) {
            this.showError('addressError', 'Address must be at least 5 characters');
            isValid = false;
        }

        return isValid;
    }

    showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
            // Animate error appearance
            errorElement.style.animation = 'none';
            setTimeout(() => {
                errorElement.style.animation = 'slideDown 0.3s ease-out';
            }, 10);
        }
    }

    clearAllErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => {
            el.textContent = '';
            el.classList.remove('show');
        });
    }

    showSuccessMessage() {
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.add('show');

        // Auto-hide after 3 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    }

    resetForm() {
        document.getElementById('studentForm').reset();
    }

    handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase().trim();

        if (searchTerm === '') {
            this.filteredStudents = [...this.students];
        } else {
            this.filteredStudents = this.students.filter(student => {
                const name = student.name.toLowerCase();
                const id = student.studentId.toLowerCase();
                const email = student.email.toLowerCase();

                return name.includes(searchTerm) || 
                       id.includes(searchTerm) || 
                       email.includes(searchTerm);
            });
        }

        this.renderStudents();
    }

    renderStudents() {
        const studentsList = document.getElementById('studentsList');
        const display = this.filteredStudents.length > 0 ? this.filteredStudents : this.students;

        // Update student count
        document.getElementById('studentCount').textContent = this.students.length;

        if (display.length === 0) {
            studentsList.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">📚</span>
                    <p>No students added yet. Add your first student to get started!</p>
                </div>
            `;
            return;
        }

        studentsList.innerHTML = display.map((student, index) => `
            <div class="student-card" style="animation-delay: ${index * 0.1}s">
                <div class="student-card-header">
                    <div>
                        <div class="student-name">👤 ${this.escapeHtml(student.name)}</div>
                        <div class="student-id">ID: ${this.escapeHtml(student.studentId)}</div>
                    </div>
                    <button class="btn-delete" onclick="studentManager.deleteStudent('${student.id}')">
                        Delete
                    </button>
                </div>
                <div class="student-details">
                    <div class="detail-item">
                        <span class="detail-label">📧 Email:</span>
                        <span class="detail-value">${this.escapeHtml(student.email)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">📱 Phone:</span>
                        <span class="detail-value">${this.escapeHtml(student.phone)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">📚 Grade:</span>
                        <span class="detail-value">${this.escapeHtml(student.grade)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">📍 Address:</span>
                        <span class="detail-value">${this.escapeHtml(student.address)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">📅 Added:</span>
                        <span class="detail-value">${student.dateAdded}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    deleteStudent(id) {
        // Create confirmation animation
        if (confirm('Are you sure you want to delete this student?')) {
            this.students = this.students.filter(student => student.id !== id);
            this.saveStudents();
            this.renderStudents();

            // Trigger delete animation feedback
            this.showDeleteAnimation();
        }
    }

    showDeleteAnimation() {
        const successMessage = document.getElementById('successMessage');
        const originalText = successMessage.innerHTML;

        // Change to delete message
        successMessage.innerHTML = '<span class="success-icon">🗑️</span><span>Student deleted successfully!</span>';
        successMessage.classList.add('show');
        successMessage.style.background = '#f87171';

        // Reset after 2 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
            successMessage.innerHTML = originalText;
            successMessage.style.background = '';
        }, 2000);
    }

    saveStudents() {
        localStorage.setItem('godegode_students', JSON.stringify(this.students));
    }

    loadStudents() {
        const stored = localStorage.getItem('godegode_students');
        this.students = stored ? JSON.parse(stored) : [];
        this.filteredStudents = [...this.students];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.studentManager = new StudentManager();

    // Add page load animation
    document.body.style.animation = 'fadeIn 0.5s ease-out';

    // Add ripple effect to buttons
    addRippleEffect();

    // Add keyboard shortcuts
    setupKeyboardShortcuts();
});

// Ripple effect for buttons
function addRippleEffect() {
    document.querySelectorAll('.btn, .btn-delete').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn, .btn-delete {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + S to submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            const form = document.getElementById('studentForm');
            if (form) form.dispatchEvent(new Event('submit'));
        }

        // Escape to clear search
        if (e.key === 'Escape') {
            const searchInput = document.getElementById('searchInput');
            if (searchInput.value) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
            }
        }
    });
}

// Add some console welcome message
console.log('%c🎓 Welcome to GODEGODE School Management System! 🎓', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cVersion: 1.0.0', 'color: #ec4899;');
console.log('%cKeyboard Shortcuts:\n- Ctrl+S: Submit form\n- Escape: Clear search', 'color: #10b981;');
