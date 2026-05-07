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
        private static readonly string LogoBase64 = File.ReadAllText(
          Path.Combine(AppContext.BaseDirectory, "Images", "orbees-branco-b64")
        ).Trim();

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
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="margin:0;padding:0;background-color:#1a1a1a;font-family:'Segoe UI',Arial,sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a1a;padding:40px 0;">
                  <tr>
                    <td align="center">
                      <table width="560" cellpadding="0" cellspacing="0" style="background-color:#242424;border-radius:12px;overflow:hidden;">
                        
                        <!-- Header -->
                        <tr>
                          <td style="background-color:#242424;padding:32px 40px 24px;border-bottom:2px solid #F5A623;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="vertical-align:middle;">
                                  <img src="data:image/png;base64,{LogoBase64}" alt="Orbees" height="50" style="display:block;">
                                </td>
                                <td style="vertical-align:middle;padding-left:12px;">
                                  <span style="font-size:24px;font-weight:700;color:#F5A623;letter-spacing:1px;">ORBEES</span>
                                  <br>
                                  <span style="font-size:11px;color:#888;letter-spacing:2px;">O ECOSSISTEMA FINANCEIRO ORGANIZADO</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                          <td style="padding:40px 40px 32px;">
                            <h1 style="margin:0 0 8px;font-size:22px;font-weight:600;color:#ffffff;">
                              Olá, {name}! 🐝
                            </h1>
                            <p style="margin:0 0 24px;font-size:15px;color:#aaaaaa;line-height:1.6;">
                              Obrigado por se cadastrar no <strong style="color:#F5A623;">Orbees</strong>. 
                              Estamos quase lá — confirme seu email para ativar sua conta e começar a organizar suas finanças.
                            </p>

                            <!-- CTA Button -->
                            <table cellpadding="0" cellspacing="0" style="margin:32px 0;">
                              <tr>
                                <td style="background-color:#F5A623;border-radius:8px;">
                                  <a href="{confirmUrl}" 
                                     style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#1a1a1a;text-decoration:none;letter-spacing:0.3px;">
                                    ✓ Confirmar Email
                                  </a>
                                </td>
                              </tr>
                            </table>

                            <p style="margin:0 0 8px;font-size:13px;color:#666;">
                              Ou copie e cole o link abaixo no seu navegador:
                            </p>
                            <p style="margin:0;font-size:12px;color:#F5A623;word-break:break-all;">
                              {confirmUrl}
                            </p>
                          </td>
                        </tr>

                        <!-- Warning -->
                        <tr>
                          <td style="padding:0 40px 32px;">
                            <table width="100%" cellpadding="0" cellspacing="0" 
                                   style="background-color:#2e2e2e;border-left:3px solid #F5A623;border-radius:4px;padding:16px;">
                              <tr>
                                <td style="padding:16px;">
                                  <p style="margin:0;font-size:13px;color:#aaaaaa;line-height:1.5;">
                                    ⏱ Este link expira em <strong style="color:#ffffff;">24 horas</strong>.<br>
                                    Se você não criou uma conta no Orbees, ignore este email com segurança.
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                          <td style="padding:24px 40px;border-top:1px solid #333;">
                            <p style="margin:0;font-size:12px;color:#555;text-align:center;">
                              © {DateTime.UtcNow.Year} Orbees · O Ecossistema Financeiro Organizado<br>
                              Este é um email automático, não responda.
                            </p>
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>
                </table>
              </body>
              </html>
            """;

            await SendAsync(to, subject, body);
        }

        public async Task SendPasswordResetAsync(string to, string name, string token)
        {
            var resetUrl = $"{_frontendUrl}/auth/reset-password?token={token}";
            var subject = "Redefinição de Senha - Orbees";
            var body = $"""
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="margin:0;padding:0;background-color:#1a1a1a;font-family:'Segoe UI',Arial,sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a1a;padding:40px 0;">
                  <tr>
                    <td align="center">
                      <table width="560" cellpadding="0" cellspacing="0" style="background-color:#242424;border-radius:12px;overflow:hidden;">
                        
                        <!-- Header -->
                        <tr>
                          <td style="background-color:#242424;padding:32px 40px 24px;border-bottom:2px solid #F5A623;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="vertical-align:middle;">
                                  <img src="data:image/png;base64,{LogoBase64}" alt="Orbees" height="50" style="display:block;">
                                </td>
                                <td style="vertical-align:middle;padding-left:12px;">
                                  <span style="font-size:24px;font-weight:700;color:#F5A623;letter-spacing:1px;">ORBEES</span>
                                  <br>
                                  <span style="font-size:11px;color:#888;letter-spacing:2px;">O ECOSSISTEMA FINANCEIRO ORGANIZADO</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                          <td style="padding:40px 40px 32px;">
                            <h1 style="margin:0 0 8px;font-size:22px;font-weight:600;color:#ffffff;">
                              Olá, {name}! 🐝
                            </h1>
                            <p style="margin:0 0 24px;font-size:15px;color:#aaaaaa;line-height:1.6;">
                              Recebemos uma solicitação para redefinir sua senha no <strong style="color:#F5A623;">Orbees</strong>. 
                              Estamos quase lá! Clique no botão abaixo para criar uma nova senha.
                            </p>

                            <!-- CTA Button -->
                            <table cellpadding="0" cellspacing="0" style="margin:32px 0;">
                              <tr>
                                <td style="background-color:#F5A623;border-radius:8px;">
                                  <a href="{resetUrl}" 
                                     style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#1a1a1a;text-decoration:none;letter-spacing:0.3px;">
                                    ✓ Redefinir Senha
                                  </a>
                                </td>
                              </tr>
                            </table>

                            <p style="margin:0 0 8px;font-size:13px;color:#666;">
                              Ou copie e cole o link abaixo no seu navegador:
                            </p>
                            <p style="margin:0;font-size:12px;color:#F5A623;word-break:break-all;">
                              {resetUrl}
                            </p>
                          </td>
                        </tr>

                        <!-- Warning -->
                        <tr>
                          <td style="padding:0 40px 32px;">
                            <table width="100%" cellpadding="0" cellspacing="0" 
                                   style="background-color:#2e2e2e;border-left:3px solid #F5A623;border-radius:4px;padding:16px;">
                              <tr>
                                <td style="padding:16px;">
                                  <p style="margin:0;font-size:13px;color:#aaaaaa;line-height:1.5;">
                                    ⏱ Este link expira em <strong style="color:#ffffff;">2 horas</strong>.<br>
                                    Se você não solicitou a redefinição de senha, ignore este email. Sua senha permanece a mesma.
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                          <td style="padding:24px 40px;border-top:1px solid #333;">
                            <p style="margin:0;font-size:12px;color:#555;text-align:center;">
                              © {DateTime.UtcNow.Year} Orbees · O Ecossistema Financeiro Organizado<br>
                              Este é um email automático, não responda.
                            </p>
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>
                </table>
              </body>
              </html>
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
            // await smtp.ConnectAsync(_host, _port, SecureSocketOptions.StartTls); -- Prod
            await smtp.ConnectAsync(_host, _port, SecureSocketOptions.None); // Dev
            // await smtp.AuthenticateAsync(_user, _password);
            await smtp.SendAsync(message);
            await smtp.DisconnectAsync(true);
        }
    }
}
