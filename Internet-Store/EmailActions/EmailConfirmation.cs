using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using System.Security.Cryptography;

namespace Internet_Store.EmailActions
{
    public class EmailConfirmation
    {
        public async Task<string> ConfirmEmailAsync(string emailname)
        {
            try
            {

                Guid guid = Guid.NewGuid();
                var emailMessage = new MailMessage();
                emailMessage.From = new MailAddress("penkov.egorushka@yandex.ru", "Администрация сайта");
                emailMessage.To.Add(new MailAddress(emailname, ""));
                emailMessage.Subject = "Test";
                emailMessage.Body = $"Please clicl this link to confirm your profile https://localhost:7239/Internetstore/Auth/EmailConfirmation?Token={guid}";
                using (var client = new SmtpClient())
                {
                    client.Host = "smtp.yandex.ru";
                    client.Port = 25;
                    client.EnableSsl = true;
                    client.UseDefaultCredentials = false;
                    client.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;

                    client.Credentials = new NetworkCredential("penkov.egorushka@yandex.ru", "nldgtfurbxjsmdvt");

                    await client.SendMailAsync(emailMessage);
                    return guid.ToString();
                }
                
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }


        }
    }
}
