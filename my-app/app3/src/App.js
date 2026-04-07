import { useState } from 'react';
import './App.css';

function App() {
  const [info, setInfo] = useState({
    name: '', email: '', phone: '', location: '', linkedin: ''
  });
  const [objective, setObjective]   = useState('');
  const [summary, setSummary]       = useState('');
  const [education, setEducation]   = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills]         = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  const handleInfo = (e) => setInfo({ ...info, [e.target.name]: e.target.value });

  const addEdu = () =>
    setEducation([...education, { id: Date.now(), degree: '', school: '', year: '' }]);

  const updateEdu = (id, field, value) =>
    setEducation(education.map(e => e.id === id ? { ...e, [field]: value } : e));

  const removeEdu = (id) => setEducation(education.filter(e => e.id !== id));

  const addExp = () =>
    setExperience([...experience, { id: Date.now(), role: '', company: '', duration: '', desc: '' }]);

  const updateExp = (id, field, value) =>
    setExperience(experience.map(e => e.id === id ? { ...e, [field]: value } : e));

  const removeExp = (id) => setExperience(experience.filter(e => e.id !== id));

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) {
      setSkills([...skills, s]);
      setSkillInput('');
    }
  };

  const addAch = () =>
    setAchievements([...achievements, { id: Date.now(), text: '' }]);

  const updateAch = (id, value) =>
    setAchievements(achievements.map(a => a.id === id ? { ...a, text: value } : a));

  const removeAch = (id) => setAchievements(achievements.filter(a => a.id !== id));

  return (
    <div className="app">
      <div className="editor">
        <h2>Resume Builder</h2>

        {/* Personal Info */}
        <section className="card">
          <h3>Personal Info</h3>
          <div className="row">
            <input name="name"     value={info.name}     onChange={handleInfo} placeholder="Full Name" />
            <input name="email"    value={info.email}    onChange={handleInfo} placeholder="Email" />
          </div>
          <div className="row">
            <input name="phone"    value={info.phone}    onChange={handleInfo} placeholder="Phone" />
            <input name="location" value={info.location} onChange={handleInfo} placeholder="Location" />
          </div>
          <input name="linkedin" value={info.linkedin} onChange={handleInfo} placeholder="LinkedIn / Portfolio URL" />
        </section>

        {/* Career Objective */}
        <section className="card">
          <h3>Career Objective</h3>
          <textarea value={objective} onChange={e => setObjective(e.target.value)}
            rows={3} placeholder="Briefly state your career goal..." />
        </section>

        {/* Professional Summary */}
        <section className="card">
          <h3>Professional Summary</h3>
          <textarea value={summary} onChange={e => setSummary(e.target.value)}
            rows={3} placeholder="Highlight your key professional achievements..." />
        </section>

        {/* Education */}
        <section className="card">
          <h3>Education</h3>
          {education.map(e => (
            <div key={e.id} className="entry">
              <input value={e.degree} onChange={ev => updateEdu(e.id, 'degree', ev.target.value)} placeholder="Degree / Course" />
              <div className="row">
                <input value={e.school} onChange={ev => updateEdu(e.id, 'school', ev.target.value)} placeholder="Institution" />
                <input value={e.year}   onChange={ev => updateEdu(e.id, 'year', ev.target.value)}   placeholder="Year (e.g. 2020–2024)" />
              </div>
              <button className="remove-btn" onClick={() => removeEdu(e.id)}>Remove</button>
            </div>
          ))}
          <button className="add-btn" onClick={addEdu}>+ Add Education</button>
        </section>

        {/* Experience */}
        <section className="card">
          <h3>Experience & Internships</h3>
          {experience.map(e => (
            <div key={e.id} className="entry">
              <div className="row">
                <input value={e.role}     onChange={ev => updateExp(e.id, 'role', ev.target.value)}     placeholder="Role / Title" />
                <input value={e.company}  onChange={ev => updateExp(e.id, 'company', ev.target.value)}  placeholder="Company" />
              </div>
              <input value={e.duration} onChange={ev => updateExp(e.id, 'duration', ev.target.value)} placeholder="Duration (e.g. Jun 2023 – Aug 2023)" />
              <textarea value={e.desc}  onChange={ev => updateExp(e.id, 'desc', ev.target.value)}  rows={2} placeholder="Brief description of responsibilities..." />
              <button className="remove-btn" onClick={() => removeExp(e.id)}>Remove</button>
            </div>
          ))}
          <button className="add-btn" onClick={addExp}>+ Add Experience</button>
        </section>

        {/* Skills */}
        <section className="card">
          <h3>Skills</h3>
          <div className="skill-input-row">
            <input
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addSkill()}
              placeholder="Type a skill and press Enter or Add"
            />
            <button onClick={addSkill}>Add</button>
          </div>
          <div className="tags">
            {skills.map((s, i) => (
              <span key={i} className="tag">
                {s}
                <button onClick={() => setSkills(skills.filter((_, j) => j !== i))}>×</button>
              </span>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="card">
          <h3>Achievements</h3>
          {achievements.map(a => (
            <div key={a.id} className="entry">
              <div className="row">
                <input value={a.text} onChange={e => updateAch(a.id, e.target.value)} placeholder="Describe your achievement..." />
                <button className="remove-btn" onClick={() => removeAch(a.id)}>Remove</button>
              </div>
            </div>
          ))}
          <button className="add-btn" onClick={addAch}>+ Add Achievement</button>
        </section>
      </div>

      {/* LIVE PREVIEW */}
      <div className="preview">
        <div className="resume-paper">
          {info.name
            ? <h1 className="resume-name">{info.name}</h1>
            : <h1 className="resume-name placeholder">Your Name</h1>
          }
          <p className="resume-contact">
            {[info.email, info.phone, info.location, info.linkedin].filter(Boolean).join(' · ')}
          </p>

          {objective && (
            <div className="resume-section">
              <h4>Career Objective</h4>
              <p>{objective}</p>
            </div>
          )}

          {summary && (
            <div className="resume-section">
              <h4>Professional Summary</h4>
              <p>{summary}</p>
            </div>
          )}

          {education.length > 0 && (
            <div className="resume-section">
              <h4>Education</h4>
              {education.map(e => (
                <div key={e.id} className="resume-entry">
                  <strong>{e.degree}</strong>
                  <span>{e.school}{e.year ? ` — ${e.year}` : ''}</span>
                </div>
              ))}
            </div>
          )}

          {experience.length > 0 && (
            <div className="resume-section">
              <h4>Experience & Internships</h4>
              {experience.map(e => (
                <div key={e.id} className="resume-entry">
                  <strong>{e.role}{e.company ? ` @ ${e.company}` : ''}</strong>
                  <span>{e.duration}</span>
                  {e.desc && <p>{e.desc}</p>}
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div className="resume-section">
              <h4>Skills</h4>
              <div className="tags">
                {skills.map((s, i) => <span key={i} className="tag">{s}</span>)}
              </div>
            </div>
          )}

          {achievements.length > 0 && (
            <div className="resume-section">
              <h4>Achievements</h4>
              <ul>
                {achievements.map(a => a.text && <li key={a.id}>{a.text}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;