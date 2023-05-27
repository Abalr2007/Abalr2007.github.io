<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Function to sanitize input data
  function sanitizeInput($input)
  {
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    return $input;
  }

  // Validate and sanitize form data
  $name = sanitizeInput($_POST['name']);
  $email = sanitizeInput($_POST['email']);
  $phone = sanitizeInput($_POST['phone']);
  $payment = sanitizeInput($_POST['payment']);
  $table = sanitizeInput($_POST['table']);

  // Validate form data
  $errors = [];

  // Validate name
  if (empty($name)) {
    $errors[] = 'Name is required.';
  }

  // Validate email
  if (empty($email)) {
    $errors[] = 'Email is required.';
  } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email format.';
  }

  // Validate phone number
  if (empty($phone)) {
    $errors[] = 'Phone number is required.';
  } elseif (!preg_match('/^[0-9]{10}$/', $phone)) {
    $errors[] = 'Invalid phone number format.';
  }

  // Validate payment method
  if (empty($payment)) {
    $errors[] = 'Payment method is required.';
  }

  // Validate table number
  if (empty($table)) {
    $errors[] = 'Table number is required.';
  }

  // If there are validation errors, display them
  if (!empty($errors)) {
    foreach ($errors as $error) {
      echo $error . '<br>';
    }
  } else {
    // Compose email message
    $to = 'aryanhbalrai@gmail.com';
    $subject = 'New Form Submission';
    $message = "Name: $name\n";
    $message .= "Email: $email\n";
    $message .= "Phone Number: $phone\n";
    $message .= "Payment Method: $payment\n";
    $message .= "Table Number: $table\n";
  // Send email
  $headers = "From: $email";
  mail($to, $subject, $message, $headers);

  // Redirect back to the form or a thank you page
  header('Location: index.html');
  exit;
}
?>
