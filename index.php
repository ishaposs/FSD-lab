<?php
include 'db.php';

if (isset($_POST['submit'])) {
    $name       = $conn->real_escape_string($_POST['name']);
    $email      = $conn->real_escape_string($_POST['email']);
    $mobile     = $conn->real_escape_string($_POST['mobile']);
    $department = $conn->real_escape_string($_POST['department']);

    $conn->query("INSERT INTO student (name, email, mobile, department)
                  VALUES ('$name', '$email', '$mobile', '$department')");
}

$result   = $conn->query("SELECT * FROM student ORDER BY id DESC");
$students = [];
while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}
$total = count($students);
$depts = count(array_unique(array_column($students, 'department')));
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Student Records</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #f5f5f4;
    color: #1c1c1a;
    min-height: 100vh;
  }

  .topbar {
    background: #fff;
    border-bottom: 1px solid #e5e5e3;
    padding: 0 2rem;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .topbar h1 { font-size: 16px; font-weight: 600; }
  .topbar-badge {
    font-size: 12px;
    padding: 3px 10px;
    border-radius: 20px;
    background: #e6f1fb;
    color: #185fa5;
    font-weight: 500;
  }

  .page { max-width: 1200px; margin: 0 auto; padding: 2rem 1.5rem; }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 1.5rem;
  }
  .stat-card {
    background: #fff;
    border: 1px solid #e5e5e3;
    border-radius: 10px;
    padding: 1rem 1.25rem;
  }
  .stat-label { font-size: 12px; color: #6b6b68; margin-bottom: 4px; }
  .stat-value { font-size: 24px; font-weight: 600; }

  .layout {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 1.5rem;
    align-items: start;
  }

  .card {
    background: #fff;
    border: 1px solid #e5e5e3;
    border-radius: 12px;
    padding: 1.5rem;
  }
  .card-title {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b6b68;
    margin-bottom: 1.25rem;
  }

  .field { margin-bottom: 1rem; }
  .field label { display: block; font-size: 13px; color: #4a4a47; margin-bottom: 5px; font-weight: 500; }
  .field input, .field select {
    width: 100%;
    padding: 9px 12px;
    font-size: 14px;
    border: 1px solid #d4d4d0;
    border-radius: 8px;
    background: #fafaf9;
    color: #1c1c1a;
    outline: none;
    transition: border-color 0.15s, background 0.15s;
  }
  .field input:focus, .field select:focus {
    border-color: #185fa5;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(24,95,165,0.08);
  }

  .btn {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: opacity 0.15s, transform 0.1s;
  }
  .btn:active { transform: scale(0.98); }
  .btn-primary { background: #185fa5; color: #fff; }
  .btn-primary:hover { background: #0c447c; }

  .search-bar {
    display: flex;
    gap: 8px;
    margin-bottom: 1rem;
  }
  .search-bar input {
    flex: 1;
    padding: 9px 12px;
    font-size: 14px;
    border: 1px solid #d4d4d0;
    border-radius: 8px;
    background: #fafaf9;
    outline: none;
    color: #1c1c1a;
  }
  .search-bar input:focus { border-color: #185fa5; background: #fff; }

  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  thead th {
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #6b6b68;
    padding: 0 12px 10px;
    border-bottom: 1px solid #e5e5e3;
  }
  tbody tr { border-bottom: 1px solid #f0f0ee; transition: background 0.1s; }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: #fafaf9; }
  tbody td { padding: 11px 12px; }

  .dept-pill {
    display: inline-block;
    font-size: 11px;
    font-weight: 500;
    padding: 3px 9px;
    border-radius: 20px;
    background: #e6f1fb;
    color: #185fa5;
  }

  .action-btn {
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid #d4d4d0;
    cursor: pointer;
    background: transparent;
    color: #4a4a47;
    transition: background 0.1s, color 0.1s;
  }
  .action-btn:hover { background: #f0f0ee; color: #1c1c1a; }
  .btn-delete:hover { background: #fef2f2; color: #991b1b; border-color: #fca5a5; }

  .empty {
    text-align: center;
    padding: 2.5rem;
    color: #9b9b97;
    font-size: 13px;
  }

  .alert {
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 13px;
    margin-bottom: 1rem;
    background: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
  }

  @media (max-width: 768px) {
    .layout { grid-template-columns: 1fr; }
    .stats { grid-template-columns: repeat(3, 1fr); }
  }
</style>
</head>
<body>

<div class="topbar">
  <h1>Student Records</h1>
  <span class="topbar-badge"><?= $total ?> student<?= $total !== 1 ? 's' : '' ?></span>
</div>

<div class="page">

  <div class="stats">
    <div class="stat-card">
      <div class="stat-label">Total students</div>
      <div class="stat-value"><?= $total ?></div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Departments</div>
      <div class="stat-value"><?= $depts ?></div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Latest ID</div>
      <div class="stat-value"><?= $total ? $students[0]['id'] : '—' ?></div>
    </div>
  </div>

  <div class="layout">

    <!-- Add Student Form -->
    <div class="card">
      <div class="card-title">Add student</div>

      <?php if (isset($_POST['submit'])): ?>
        <div class="alert">Student added successfully.</div>
      <?php endif; ?>

      <form method="POST">
        <div class="field">
          <label>Full name</label>
          <input type="text" name="name" placeholder="e.g. Priya Sharma" required>
        </div>
        <div class="field">
          <label>Email address</label>
          <input type="email" name="email" placeholder="priya@example.com" required>
        </div>
        <div class="field">
          <label>Mobile</label>
          <input type="tel" name="mobile" placeholder="+91 98765 43210" required>
        </div>
        <div class="field">
          <label>Department</label>
          <select name="department" required>
            <option value="">Select department</option>
            <option>Computer Science</option>
            <option>Electrical Engineering</option>
            <option>Mechanical Engineering</option>
            <option>Civil Engineering</option>
            <option>Information Technology</option>
          </select>
        </div>
        <button class="btn btn-primary" type="submit" name="submit">Add student</button>
      </form>
    </div>

    <!-- Student Table -->
    <div class="card">
      <div class="search-bar">
        <input type="text" id="search" placeholder="Search by name or email…" oninput="filterTable()">
      </div>

      <?php if (empty($students)): ?>
        <div class="empty">No students yet. Add one to get started.</div>
      <?php else: ?>
        <table id="student-table">
          <thead>
            <tr>
              <th style="width:44px">#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Department</th>
              <th style="width:100px">Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($students as $row): ?>
            <tr>
              <td style="color:#9b9b97;font-size:12px"><?= htmlspecialchars($row['id']) ?></td>
              <td style="font-weight:500"><?= htmlspecialchars($row['name']) ?></td>
              <td style="color:#4a4a47"><?= htmlspecialchars($row['email']) ?></td>
              <td><?= htmlspecialchars($row['mobile']) ?></td>
              <td><span class="dept-pill"><?= htmlspecialchars(explode(' ', $row['department'])[0]) ?></span></td>
              <td style="display:flex;gap:5px;padding:11px 12px">
                <a href="edit.php?id=<?= $row['id'] ?>"><button class="action-btn">Edit</button></a>
                <a href="delete.php?id=<?= $row['id'] ?>" onclick="return confirm('Delete this student?')"><button class="action-btn btn-delete">Delete</button></a>
              </td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      <?php endif; ?>
    </div>

  </div>
</div>

<script>
function filterTable() {
  const q = document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('#student-table tbody tr').forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(q) ? '' : 'none';
  });
}
</script>

</body>
</html>