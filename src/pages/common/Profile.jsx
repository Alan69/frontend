import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { BASE_URL } from './../../base.js';
const Profile = () => {


  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleUpdateBalance = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/payments/add-balance/`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );

            if (response.status === 200) {
              console.log('Баланс добавлен:', response.data.success);
              alert(`Успех: ${response.data.success}`);
              window.location.reload(); // Обновить страницу после успешного добавления баланса
          } else {
              console.error('Неожиданный ответ:', response);
              alert('Произошла непредвиденная ошибка.');
          }
          } catch (error) {
              console.error('Ошибка при добавлении баланса:', error);
              alert(`Ошибка: ${error.response?.data?.error || 'Произошла ошибка при добавлении баланса'}`);
          }
    };

  const [input, setInput] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    region: '',
    institution: '',
    phone: '',
    balance: '0',
    referral: '',
    bonus: '0',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/accounts/api/user/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const userData = response.data;
        setInput({
          username: userData.username || '',
          email: userData.email || '',
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          region: userData.region || '',
          institution: userData.school || '',
          phone: userData.phone_number || '',
          balance: userData.balance || '0',
          referral: userData.referral_link || '',
          bonus: userData.referral_bonus || '0',
        });
      } catch (error) {
        swal('Ошибка', 'Не удалось получить данные профиля', 'error');
      }
    };

    fetchProfile();
  }, []);

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateData = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://127.0.0.1:8000/accounts/api/user/', input, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`, // Подкорректируйте, если используете другой метод аутентификации
        },
      });
      swal('Успешно', 'Профиль успешно обновлен', 'success');
    } catch (error) {
      swal('Ошибка', 'Не удалось обновить данные профиля', 'error');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    swal('Изменить пароль', 'Функция смены пароля еще не реализована', 'info');
  };

  

  const handleAddFunds = (e) => {
    e.preventDefault();
    swal('Пополнить баланс', 'Функция пополнения баланса еще не реализована', 'info');
  };

  return (
    <div className="container mx-auto p-6">
      <div className='order-1 block rounded-lg bg-white px-[80px] py-[80px] md:order-2'>
        <h2 className='font-bold leading-[1.6]'>Профиль</h2>
        <form onSubmit={handleUpdateData} className='flex flex-col gap-y-5'>
          <div className='grid grid-cols-1 gap-6 xl:grid-cols-2'>
            <div className='flex flex-col gap-y-[10px]'>
              <label htmlFor='profile-username' className='text-lg font-bold leading-[1.6]'>Имя пользователя</label>
              <input
                type='text'
                name='username'
                value={input.username}
                onChange={handleInput}
                id='profile-username'
                className='rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed'
                disabled
              />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <label htmlFor='profile-first_name' className='text-lg font-bold leading-[1.6]'>Имя</label>
              <input
                type='text'
                name='first_name'
                value={input.first_name}
                onChange={handleInput}
                id='profile-first_name'
                className='rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed'
              />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <label htmlFor='profile-last_name' className='text-lg font-bold leading-[1.6]'>Фамилия</label>
              <input
                type='text'
                name='last_name'
                value={input.last_name}
                onChange={handleInput}
                id='profile-last_name'
                className='rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed'
              />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <label htmlFor='profile-region' className='text-lg font-bold leading-[1.6]'>Регион</label>
              <input
                type='text'
                name='region'
                value={input.region}
                onChange={handleInput}
                id='profile-region'
                className='rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed'
              />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <label htmlFor='profile-institution' className='text-lg font-bold leading-[1.6]'>Учреждение</label>
              <input
                type='text'
                name='institution'
                value={input.institution}
                onChange={handleInput}
                id='profile-institution'
                className='rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed'
              />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <label htmlFor='profile-email' className='text-lg font-bold leading-[1.6]'>Электронная почта</label>
              <input
                type='email'
                name='email'
                value={input.email}
                onChange={handleInput}
                id='profile-email'
                className='rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed'
              />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <label htmlFor='profile-phone' className='text-lg font-bold leading-[1.6]'>Телефон</label>
              <input
                type='tel'
                name='phone'
                value={input.phone}
                onChange={handleInput}
                id='profile-phone'
                className='rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed'
              />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <label htmlFor='profile-balance' className='text-lg font-bold leading-[1.6]'>Баланс</label>
              <input
                type='text'
                name='balance'
                value={input.balance}
                onChange={handleInput}
                id='profile-balance'
                className='rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed'
                disabled
              />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <label htmlFor='profile-referral' className='text-lg font-bold leading-[1.6]'>Реферальная ссылка</label>
              <input
                type='text'
                name='referral'
                value={input.referral}
                onChange={handleInput}
                id='profile-referral'
                className='rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed'
                disabled
              />
            </div>
            <div className='flex flex-col gap-y-[10px]'>
              <label htmlFor='profile-bonus' className='text-lg font-bold leading-[1.6]'>Бонус</label>
              <input
                type='text'
                name='bonus'
                value={input.bonus}
                onChange={handleInput}
                id='profile-bonus'
                className='rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-bold text-black outline-none transition-all placeholder:text-slate-500 focus:border-colorOrangyRed'
                disabled
              />
            </div>
          </div>
          <div className='grid grid-cols-1 gap-6 xl:grid-cols-2'>
            <div>
              <button
                type='submit'
                className='w-full rounded-full bg-colorOrangyRed px-[60px] py-[17px] text-lg font-bold text-white transition-all hover:bg-black'
              >
                Обновить данные
              </button>
            </div>
            <div>
              <button
                type='button'
                onClick={handleChangePassword}
                className='w-full rounded-full bg-black px-[60px] py-[17px] text-lg font-bold text-white transition-all hover:bg-colorOrangyRed'
              >
                Изменить пароль
              </button>
            </div>
            <div>
              <button
                type='button'
                onClick={handleUpdateBalance}
                className='w-full rounded-full bg-black px-[60px] py-[17px] text-lg font-bold text-white transition-all hover:bg-colorOrangyRed'
              >
                Обновить баланс
              </button>
            </div>
            <div>
              <button
                type='button'
                onClick={handleAddFunds}
                className='w-full rounded-full bg-black px-[60px] py-[17px] text-lg font-bold text-white transition-all hover:bg-colorOrangyRed'
              >
                Пополнить баланс
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
