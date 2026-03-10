<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GODEGODE School Management - Student Registration</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="background-animation"></div>
    
    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="header-content">
                <h1 class="title fade-in-down">GODEGODE School Management</h1>
                <p class="subtitle fade-in-up">Student Registration System</p>
            </div>
        </header>

        <!-- Main Content -->
        <main class="main-content">
            <div class="content-wrapper">
                <!-- Add Student Form -->
                <section class="form-section slide-in-left">
                    <h2 class="section-title">Add New Student</h2>
                    
                    <form id="studentForm" class="student-form">
                        <div class="form-group">
                            <label for="studentName">Full Name</label>
                            <input type="text" id="studentName" name="studentName" required placeholder="Enter student name">
                            <span class="error-message" id="nameError"></span>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="studentId">Student ID</label>
                                <input type="text" id="studentId" name="studentId" required placeholder="Enter student ID">
                                <span class="error-message" id="idError"></span>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" required placeholder="Enter email">
                                <span class="error-message" id="emailError"></span>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="phone">Phone Number</label>
                                <input type="tel" id="phone" name="phone" required placeholder="Enter phone number">
                                <span class="error-message" id="phoneError"></span>
                            </div>
                            <div class="form-group">
                                <label for="grade">Grade/Class</label>
                                <select id="grade" name="grade" required>
                                    <option value="">Select Grade</option>
                                    <option value="Grade 1">Grade 1</option>
                                    <option value="Grade 2">Grade 2</option>
                                    <option value="Grade 3">Grade 3</option>
                                    <option value="Grade 4">Grade 4</option>
                                    <option value="Grade 5">Grade 5</option>
                                    <option value="Grade 6">Grade 6</option>
                                    <option value="Grade 7">Grade 7</option>
                                    <option value="Grade 8">Grade 8</option>
                                    <option value="Grade 9">Grade 9</option>
                                    <option value="Grade 10">Grade 10</option>
                                    <option value="Grade 11">Grade 11</option>
                                    <option value="Grade 12">Grade 12</option>
                                </select>
                                <span class="error-message" id="gradeError"></span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="address">Address</label>
                            <textarea id="address" name="address" required placeholder="Enter student address" rows="3"></textarea>
                            <span class="error-message" id="addressError"></span>
                        </div>

                        <button type="submit" class="btn btn-primary">
                            <span class="btn-text">Add Student</span>
                            <span class="btn-icon">✓</span>
                        </button>
                    </form>

                    <!-- Success Message -->
                    <div id="successMessage" class="success-message">
                        <span class="success-icon">✓</span>
                        <span>Student added successfully!</span>
                    </div>
                </section>

                <!-- Students List -->
                <section class="students-section slide-in-right">
                    <h2 class="section-title">
                        Registered Students
                        <span class="student-count" id="studentCount">0</span>
                    </h2>
                    
                    <div class="search-box">
                        <input type="text" id="searchInput" placeholder="Search students by name or ID...">
                        <span class="search-icon">🔍</span>
                    </div>

                    <div id="studentsList" class="students-list">
                        <div class="empty-state">
                            <span class="empty-icon">📚</span>
                            <p>No students added yet. Add your first student to get started!</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>

    <script src="js/script.js"></script>
</body>
</html>
