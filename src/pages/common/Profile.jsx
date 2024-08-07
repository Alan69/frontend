import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

const Profile = () => {
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
        const response = await axios.get('https://synaqtest.kz/accounts/api/user/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`, // Adjust if using different auth
          },
        });
        const userData = response.data;
        setInput({
          username: userData.username || '',
          email: userData.email || '',
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          region: userData.region || '',
          institution: userData.institution || '',
          phone: userData.phone || '',
          balance: userData.balance || '0',
          referral: userData.referral || '',
          bonus: userData.bonus || '0',
        });
      } catch (error) {
        swal('Error', 'Failed to fetch profile data', 'error');
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
      await axios.put('https://synaqtest.kz/accounts/api/user/', input, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`, // Adjust if using different auth
        },
      });
      swal('Success', 'Profile updated successfully', 'success');
    } catch (error) {
      swal('Error', 'Failed to update profile data', 'error');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    swal('Change Password', 'Password change functionality is not implemented yet', 'info');
  };

  const handleUpdateBalance = (e) => {
    e.preventDefault();
    swal('Update Balance', 'Balance update functionality is not implemented yet', 'info');
  };

  const handleAddFunds = (e) => {
    e.preventDefault();
    swal('Add Funds', 'Add funds functionality is not implemented yet', 'info');
  };

  return (
    <div className="container mx-auto p-6">
      <div className='order-1 block rounded-lg bg-white px-[80px] py-[80px] md:order-2'>
        <h2 className='font-bold leading-[1.6]'>Profile</h2>
        <form onSubmit={handleUpdateData} className='flex flex-col gap-y-5'>
          <div className='grid grid-cols-1 gap-6 xl:grid-cols-2'>
            <div className='flex flex-col gap-y-[10px]'>
              <label htmlFor='profile-username' className='text-lg font-bold leading-[1.6]'>Username</label>
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
              <label htmlFor='profile-first_name' className='text-lg font-bold leading-[1.6]'>First Name</label>
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
              <label htmlFor='profile-last_name' className='text-lg font-bold leading-[1.6]'>Last Name</label>
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
              <label htmlFor='profile-region' className='text-lg font-bold leading-[1.6]'>Region</label>
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
              <label htmlFor='profile-institution' className='text-lg font-bold leading-[1.6]'>Institution</label>
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
              <label htmlFor='profile-email' className='text-lg font-bold leading-[1.6]'>Email</label>
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
              <label htmlFor='profile-phone' className='text-lg font-bold leading-[1.6]'>Phone</label>
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
              <label htmlFor='profile-balance' className='text-lg font-bold leading-[1.6]'>Balance</label>
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
              <label htmlFor='profile-referral' className='text-lg font-bold leading-[1.6]'>Referral Link</label>
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
              <label htmlFor='profile-bonus' className='text-lg font-bold leading-[1.6]'>Bonus</label>
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
          <div className='mt-5 flex gap-x-4'>
            <button
              type='submit'
              className='button flex-1 rounded-[50px] border-2 border-black bg-black py-4 text-white after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white'
            >
              Update Profile
            </button>
            <button
              onClick={handleChangePassword}
              className='button flex-1 rounded-[50px] border-2 border-black bg-black py-4 text-white after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white'
            >
              Change Password
            </button>
            <button
              onClick={handleUpdateBalance}
              className='button flex-1 rounded-[50px] border-2 border-black bg-black py-4 text-white after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white'
            >
              Update Balance
            </button>
            <button
              onClick={handleAddFunds}
              className='button flex-1 rounded-[50px] border-2 border-black bg-black py-4 text-white after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white'
            >
              Add Funds
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
