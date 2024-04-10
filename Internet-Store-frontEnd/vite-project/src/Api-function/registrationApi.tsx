

async function registrationApi(form: { elements: { name: { value: any; }; email: { value: any; }; password: { value: any; }; }; reset: () => void; }, 
validatedSetter: (arg0: boolean) => void, passwordSetter: (arg0: string) => void, confirmPasswordSetter: (arg0: string) => void, passwordsMatchSetter: (arg0: boolean) => void){
   // Передаем состояния и методы обновления в функцию registrationApi
 
    try {
      const response = await fetch('http://example.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.elements.name.value,
          email: form.elements.email.value,
          password: form.elements.password.value,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      form.reset();
      validatedSetter(false);
      passwordSetter('');
      confirmPasswordSetter('');
      passwordsMatchSetter(true);
    } catch (error) {
      console.error('Registration error:', error);
      // Обработка ошибок регистрации
    }
  };

export default registrationApi