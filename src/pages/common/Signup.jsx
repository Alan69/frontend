import { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

const Signup = () => {
  const [input, setInput] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    check: false,
  });

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckBox = (value) => {
    setInput((prev) => ({ ...prev, check: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      input.username === '' ||
      input.email === '' ||
      input.first_name === '' ||
      input.last_name === '' ||
      input.password === ''
    ) {
      swal('Oops', 'Please fill all fields', 'error');
      return;
    }
    if (!input.check) {
      swal('Oops', 'Please accept the Terms & Conditions and Privacy Policy', 'error');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/accounts/api/register/', {
        username: input.username,
        email: input.email,
        first_name: input.first_name,
        last_name: input.last_name,
        password: input.password,
      });

      if (response.status === 201) {
        swal('Success', 'Account created successfully', 'success');
      }
    } catch (error) {
      swal('Error', 'Registration failed', 'error');
    }
  };

  return (
    <>
      <main className='main-wrapper relative overflow-hidden'>
        <section id='signup-section'>
          <div className='py-40 pt-36 xl:pb-[200px] xl:pt-[180px]'>
            <div className='global-container'>
              <div className='mx-auto max-w-[910px] text-center'>
                <h1 className='mb-[50px]'>Создать аккаунт</h1>
                <div className='block rounded-lg bg-white px-[30px] py-[50px] text-left shadow-[0_4px_60px_0_rgba(0,0,0,0.1)] sm:px-10'>
                  <form onSubmit={handleSubmit} className='flex flex-col gap-y-5'>
                    <div className='grid grid-cols-1 gap-6'>
                      <div className='flex flex-col gap-y-[10px]'>
                        <label htmlFor='signup-username' className='text-lg font-bold leading-[1.6]'>
                          Логин
                        </label>
                        <input
                          type='text'
                          name='username'
                          value={input.username}
                          onChange={handleInput}
                          id='signup-username'
                          placeholder='Введите логин'
                          className='rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed'
                          required
                        />
                      </div>
                      <div className='flex flex-col gap-y-[10px]'>
                        <label htmlFor='signup-email' className='text-lg font-bold leading-[1.6]'>
                          Почта
                        </label>
                        <input
                          type='email'
                          name='email'
                          value={input.email}
                          onChange={handleInput}
                          id='signup-email'
                          placeholder='example@gmail.com'
                          className='rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed'
                          required
                        />
                      </div>
                      <div className='flex flex-col gap-y-[10px]'>
                        <label htmlFor='signup-first_name' className='text-lg font-bold leading-[1.6]'>
                          Имя
                        </label>
                        <input
                          type='text'
                          name='first_name'
                          value={input.first_name}
                          onChange={handleInput}
                          id='signup-first_name'
                          placeholder='Введите имя'
                          className='rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed'
                          required
                        />
                      </div>
                      <div className='flex flex-col gap-y-[10px]'>
                        <label htmlFor='signup-last_name' className='text-lg font-bold leading-[1.6]'>
                          Фамилия
                        </label>
                        <input
                          type='text'
                          name='last_name'
                          value={input.last_name}
                          onChange={handleInput}
                          id='signup-last_name'
                          placeholder='Введите фамилию'
                          className='rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed'
                          required
                        />
                      </div>
                      <div className='flex flex-col gap-y-[10px]'>
                        <label htmlFor='signup-password' className='text-lg font-bold leading-[1.6]'>
                          Пароль
                        </label>
                        <input
                          type='password'
                          name='password'
                          value={input.password}
                          onChange={handleInput}
                          id='signup-password'
                          placeholder='............'
                          className='rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed'
                          required
                        />
                      </div>
                      <div className='flex gap-x-8 gap-y-[10px]'>
                        <input
                          type='checkbox'
                          className="relative appearance-none after:absolute after:left-0 after:top-[6px] after:h-4 after:w-4 after:rounded-[3px] after:border after:border-[#7F8995] after:bg-white after:text-white after:transition-all after:delay-300 checked:after:border-colorOrangyRed checked:after:bg-colorOrangyRed checked:after:bg-[url('/assets/img/th-1/icon-white-checkmark-filled.svg')]"
                          name='check'
                          checked={input.check}
                          onChange={() => handleCheckBox(!input.check)}
                          id='signup-check'
                          required
                        />
                        <label htmlFor='signup-check' className='text-base leading-[1.6]'>
                          Я прочитал и ознакомился с 
                          <Link to='#' className='font-bold hover:text-colorOrangyRed'>
                            Правилами
                          </Link>
                        </label>
                      </div>
                    </div>
                    <button
                      type='submit'
                      className='button mt-7 block rounded-[50px] border-2 border-black bg-black py-4 text-white after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white'
                    >
                      Создать аккаунт
                    </button>
                  </form>
                  <div className='relative z-[1] mb-14 mt-9 text-center font-bold before:absolute before:left-0 before:top-1/2 before:-z-[1] before:h-[1px] before:w-full before:-translate-y-1/2 before:bg-[#EAEDF0]'>
                    <span className='inline-block bg-white px-6'>Или</span>
                  </div>
                  <div className='flex flex-col gap-y-6'>
                    <a className='button flex w-full justify-center gap-x-4 rounded-[50px] border-2 border-[#EAEDF0] bg-white py-4 hover:bg-slate-200 cursor-pointer'>
                      <span className='hidden h-6 w-6 sm:inline-block'>
                        <img
                          src='assets/img/th-1/flat-color-icons-google.svg'
                          alt='flat-color-icons-google'
                          width={24}
                          height={24}
                        />
                      </span>
                      Зарегистрироваться с помощью Google
                    </a>
                    <a className='button flex w-full justify-center gap-x-4 rounded-[50px] border-2 border-[#EAEDF0] bg-white py-4 hover:bg-slate-200 cursor-pointer'>
                      <span className='hidden h-6 w-6 sm:inline-block'>
                        <img
                          src='assets/img/th-1/flat-color-icon-facebook.svg'
                          alt='flat-color-icon-facebook'
                          width={24}
                          height={24}
                        />
                      </span>
                      Зарегистрироваться с помощью Facebook
                    </a>
                  </div>
                  <div className='mt-10 text-center'>
                    Уже есть аккаунт? &nbsp;
                    <Link to='/login' className='text-base font-semibold hover:text-colorOrangyRed'>
                      Войти
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Signup;
