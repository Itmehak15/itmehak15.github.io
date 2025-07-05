<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($_POST["message"]));

    // Recipient email address
    $to = "nairmehak07@gamil.com"; // Replace with your actual email address

    // Subject of the email
    $subject = "New Contact Form Submission from Your Website";

    // Build the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:$message\n";

    // Build the email headers
    $email_headers = "From: $name <$email>\r\n";
    $email_headers .= "Reply-To: $email\r\n";

    // Send the email
    if (mail($to, $subject, $email_content, $email_headers)) {
        // Email sent successfully
        echo "success";
    } else {
        // Error sending email
        echo "error";
    }
} else {
    // Not a POST request
    echo "invalid";
}
?>