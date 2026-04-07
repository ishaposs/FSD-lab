<?php
include 'db.php';

$id = $_GET['id'];

// FETCH DATA
$result = $conn->query("SELECT * FROM student WHERE id=$id");
$row = $result->fetch_assoc();

// UPDATE
if (isset($_POST['update'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $department = $_POST['department'];

    $conn->query("UPDATE student SET 
        name='$name',
        email='$email',
        mobile='$mobile',
        department='$department'
        WHERE id=$id");

    header("Location: index.php");
}
?>

<!DOCTYPE html>
<html>
<body>

<h2>Edit Student</h2>

<form method="POST">
    Name: <input type="text" name="name" value="<?php echo $row['name']; ?>"><br><br>
    Email: <input type="text" name="email" value="<?php echo $row['email']; ?>"><br><br>
    Mobile: <input type="text" name="mobile" value="<?php echo $row['mobile']; ?>"><br><br>
    Department: <input type="text" name="department" value="<?php echo $row['department']; ?>"><br><br>

    <button type="submit" name="update">Update</button>
</form>

</body>
</html>