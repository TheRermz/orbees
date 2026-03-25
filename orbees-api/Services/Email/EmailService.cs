using Api.Services.Interfaces.Email;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace Api.Services.Email
{
    public class EmailService : IEmailService
    {
        private readonly string _host;
        private readonly int _port;
        private readonly string _user;
        private readonly string _password;
        private readonly string _from;
        private readonly string _frontendUrl;

        public EmailService()
        {
            _host = Environment.GetEnvironmentVariable("MAIL_HOST")
              ?? throw new InvalidOperationException("MAIL_HOST não definido.");
            _port = int.Parse(Environment.GetEnvironmentVariable("MAIL_PORT") ?? "587");
            _user = Environment.GetEnvironmentVariable("MAIL_USER")
              ?? throw new InvalidOperationException("MAIL_USER não definido.");
            _password = Environment.GetEnvironmentVariable("MAIL_PASSWORD")
              ?? throw new InvalidOperationException("MAIL_PASSWORD não definido.");
            _from = Environment.GetEnvironmentVariable("MAIL_FROM")
              ?? throw new InvalidOperationException("MAIL_FROM não definido.");
            _frontendUrl = Environment.GetEnvironmentVariable("FRONTEND_URL")
              ?? "http://localhost:5173";
        }

        public async Task SendEmailConfirmationAsync(string to, string name, string token)
        {
            var confirmUrl = $"{_frontendUrl}/auth/confirm-email?token={token}";
            var subject = "Confirme seu Email - Orbees";
            var body = $"""
                <h2>Olá, {name}!</h2>
                <p>Obrigado por se cadastrar no <strong>Orbees</strong>!</p>
                <p>Clique no botão abaixo para confirmar seu email:</p>
                <a href='{confirmUrl}'
                style='display:inline-block;padding:12px 24px;background:#4F46E5;color:#fff;border-radius:6px;text-decoration:none;'>
                Confirmar Email
                </a>
                <p>O link expira em <strong>24 horas</strong>.</p>
                <p>Se você não criou uma conta no Orbees, ignore este email.</p>
            """;

            await SendAsync(to, subject, body);
        }

        public async Task SendPasswordResetAsync(string to, string name, string token)
        {
            var resetUrl = $"{_frontendUrl}/auth/reset-password?token={token}";
            var subject = "Redefinição de Senha - Orbees";
            var body = $"""
            <h2>Olá, {name}!</h2>
            <p>Recebemos uma solicitação para redefinir a senha da sua conta no <strong>Orbees</strong>.</p>
            <a href='{resetUrl}'
            style='display:inline-block;padding:12px 24px;background:#4F46E5;color:#fff;border-radius:6px;text-decoration:none;'>
            Redefinir Senha
            </a>
            <p>O link expira em <strong>2 horas</strong>.</p>
            <p>Se você não solicitou a redefinição, ignore este email.</p>
            """;

            await SendAsync(to, subject, body);
        }

        private async Task SendAsync(string to, string subject, string htmlBody)
        {
            var message = new MimeMessage();
            message.From.Add(MailboxAddress.Parse(_from));
            message.To.Add(MailboxAddress.Parse(to));
            message.Subject = subject;
            message.Body = new BodyBuilder { HtmlBody = htmlBody }.ToMessageBody();

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_host, _port, SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_user, _password);
            await smtp.SendAsync(message);
            await smtp.DisconnectAsync(true);
        }
    }
}
