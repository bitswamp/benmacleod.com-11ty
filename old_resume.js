const pretty = require('pretty')

// load resume data from file
const resume = require('./resume.json')

// helper functions for lists (paragraphs, jobs, etc)
const paragraphs = (list) => list.map(para => `<p>${para}</p>`)

const bullets = (list) => list.map(item => `<li>${item}</li>`)

const sections = (list) => list.map(section => `<section>
  <h5>${section.title}</h5>
  <ul>
    ${bullets(section.content).join("\n")}
  </ul>
</section>
`)

const jobs = (list) => list.map(job => `<section class="work-entry">
  <header>
    <h4 class="position">
      ${job.position}
    </h4>
    <span class="line"></span>
    <span class="date">${job.date}</span>
  </header>
  <div class="employer">
    <a href="${job.website}">
      ${job.employer}
    </a>
    <span class="print-only">(${job.business_shorter})</span>
    <p class="employer-description no-print">${job.business}</p>
  </div>
  ${sections(job.sections).join("")}
</section>
`)

const programs = (list) => list.map(program => `<section class="education-entry">
  <header>
    <h4 class="position">
      ${program.program}
    </h4>
    <span class="line"></span>
    <span class="date">${program.date}</span>
  </header>
  <div class="school">
    ${program.school}
    (${program.location})
  </div>
  ${sections(program.sections).join("")}
</section>
`)

// build html document from template parts
const head = `<head>
    <meta charset="utf-8">
    <title>${resume.name} - ${resume.title} Resume</title>

    <meta name="viewport" content="width=device-width">
    <meta name="Description" content="${resume.about[0]}">

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">

    <link rel="stylesheet" href="index.css" />
    <link rel="stylesheet" href="/css/font-awesome.min.css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700,600' rel='stylesheet' type='text/css'>
</head>
`

const header = `<header>
  <h1>
    ${resume.name}
  </h1>
  <h2>
    ${resume.title}
  </h2>
</header>
`

const contact = `<section id="contact">
  <h3>Contact</h3>
  <dl>
    <div>
      <dt>Email</dt>
      <dd>
        <a href="mailto:${resume.contact.email}" aria-label="email address">
          ${resume.contact.email}
        </a>
      </dd>
    </div>
    <div>
      <dt>Website</dt>
      <dd>
        <a href="${resume.contact.website}" aria-label="personal homepage">
          ${resume.contact.website}
        </a>
      </dd>
    </div>
    <div>
      <dt>Github</dt>
      <dd>
        <a href="https://github.com/${resume.contact.github}" class="github" aria-label="github account">
          ${resume.contact.github}
        </a>
      </dd>
    </div>
  </dl>
</section>
`

const about = `<section id="about">
  <h3>About</h3>
  ${paragraphs(resume.about).join("\n")}
</section>
`

const skills = `<section id="skills">
  <h3>Skills</h3>
  <div>
    <section>
      <h4 id="primary-skills">Primary</h4>
      <ul aria-labelledby="primary-skills">
        ${bullets(resume.skills.primary).join("\n")}
      </ul>
    </section>
    <section>
      <h4 id="secondary-skills">Secondary</h4>
      <ul aria-labelledby="secondary-skills">
        ${bullets(resume.skills.secondary).join("\n")}
      </ul>
    </section>
  </div>
</section>
`

const work = `<section id="work">
  <h3>Work</h3>
  ${jobs(resume.work).join("\n")}
</section>
`

const education = `<section id="education">
  <h3>Education</h3>
  ${programs(resume.education).join("\n")}
</section>
`

const main = `<main>
  ${contact}
  ${about}
  ${skills}
  ${work}
  ${education}
</main>
`

const body = `<body>
  ${header}
  ${main}
</body>
`

const html = `<!DOCTYPE html>
<html lang=${resume.language}>
  ${head}
  ${body}
</html>
`

// return the prettyprinted html, suitable to be piped to a file
// (sorry for the ableist property name from the author of pretty)
console.log(pretty(html, {ocd: true}));
