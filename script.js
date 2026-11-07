// Fetch data from JSON file

fetch("data.json")

    .then(function(response) {

        if (!response.ok) {
            throw new Error("Unable to load portfolio data.");
        }

        return response.json();

    })

    .then(function(data) {

        // Hide loading message
        document.getElementById("loadingMessage").style.display = "none";

        // Display portfolio
        document.getElementById("portfolioContent").hidden = false;


        // 1. Personal Information

        document.getElementById("logo").textContent = data.personal.name;

        document.getElementById("studentName").textContent = data.personal.name;

        document.getElementById("profileImage").src = data.personal.profileImage;

        document.getElementById("profileImage").alt =
            data.personal.name + " profile photo";

        document.getElementById("introduction").textContent =
            data.personal.introduction;

        document.getElementById("careerGoal").textContent =
            data.personal.careerGoal;

        document.getElementById("resumeLink").href =
            data.personal.resume;


        // Display About Information

        document.getElementById("aboutDescription").textContent =
            data.about.description;

        document.getElementById("studentEmail").textContent =
            data.personal.email;

        document.getElementById("studentPhone").textContent =
            data.personal.phone;


        // 2. Display Skills

        let skillsHTML = "";

        data.skills.forEach(function(skill) {

            skillsHTML += `

                <div class="col-md-4 col-sm-6">

                    <div class="skill-card">

                        <i class="${skill.icon}"></i>

                        <h5>${skill.name}</h5>

                        <p>${skill.description}</p>

                    </div>

                </div>

            `;

        });

        document.getElementById("skillsContainer").innerHTML =
            skillsHTML;


        // 3. Display Projects

        let projectsHTML = "";

        data.projects.forEach(function(project) {

            let technologyHTML = "";

            project.technologies.forEach(function(technology) {

                technologyHTML += `
                    <span class="tech-badge">
                        ${technology}
                    </span>
                `;

            });


            projectsHTML += `

                <div class="col-md-6 col-lg-4">

                    <div class="project-card">

                        <img src="${project.image}"
                            alt="${project.name}"
                            loading="lazy">

                        <div class="card-body">

                            <h5>${project.name}</h5>

                            <p>${project.description}</p>

                            <div>
                                ${technologyHTML}
                            </div>

                            <a href="${project.link}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="project-link">

                                View Project
                                <i class="bi bi-arrow-right"></i>

                            </a>

                        </div>

                    </div>

                </div>

            `;

        });

        document.getElementById("projectsContainer").innerHTML =
            projectsHTML;


        // 4. Display Education

        let educationHTML = "";

        data.education.forEach(function(education) {

            educationHTML += `

                <div class="education-card">

                    <h4>${education.degree}</h4>

                    <h5>${education.college}</h5>

                    <p>
                        <strong>Semester:</strong>
                        ${education.semester}
                    </p>

                    <p>
                        <strong>Year:</strong>
                        ${education.year}
                    </p>

                    <p>${education.details}</p>

                </div>

            `;

        });

        document.getElementById("educationContainer").innerHTML =
            educationHTML;


        // 5. Display Certifications

        let certificatesHTML = "";

        data.certifications.forEach(function(certificate) {

            certificatesHTML += `

                <div class="col-md-4 col-sm-6">

                    <div class="certificate-card">

                        <i class="${certificate.icon}"></i>

                        <h5>${certificate.name}</h5>

                        <p>${certificate.organization}</p>

                        <span>${certificate.year}</span>

                    </div>

                </div>

            `;

        });

        document.getElementById("certificationsContainer").innerHTML =
            certificatesHTML;


        // 6. Display Social Media Links

        let socialHTML = "";

        data.social.forEach(function(social) {

            socialHTML += `

                <a href="${social.link}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="${social.name}"
                    title="${social.name}">

                    <i class="${social.icon}"></i>

                </a>

            `;

        });

        document.getElementById("socialLinks").innerHTML =
            socialHTML;


        // 7. Footer Information

        document.getElementById("footerName").textContent =
            data.personal.name;

        document.getElementById("copyrightName").textContent =
            data.personal.name;

        document.getElementById("currentYear").textContent =
            new Date().getFullYear();


    })

    // Error Handling

    .catch(function(error) {

        document.getElementById("loadingMessage").style.display = "none";

        document.getElementById("errorMessage").textContent =
            "Error: " + error.message +
            " Please check data.json and run the project using Live Server.";

        console.error(error);

    });



// 8. Contact Form Validation

document.getElementById("contactForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("contactName").value.trim();

    let email = document.getElementById("contactEmail");

    let subject = document.getElementById("contactSubject").value.trim();

    let message = document.getElementById("contactMessage").value.trim();

    let formMessage = document.getElementById("formMessage");


    // Check empty fields

    if (name === "" || email.value.trim() === "" ||
        subject === "" || message === "") {

        formMessage.textContent = "Please fill all the fields.";

        formMessage.style.color = "red";

        return;

    }


    // Check email format

    if (!email.checkValidity()) {

        formMessage.textContent = "Please enter a valid email address.";

        formMessage.style.color = "red";

        return;

    }


    // Success message

    formMessage.textContent =
        "Thank you! Your form has been validated successfully.";

    formMessage.style.color = "green";


    // Clear form

    document.getElementById("contactForm").reset();

});