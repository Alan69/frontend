import { Link } from 'react-router-dom';

const Footer_01 = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <footer className='relative z-[1] -mt-[70px] overflow-hidden rounded-tl-[30px] rounded-tr-[30px] bg-colorLinenRuffle lg:rounded-tl-[50px] lg:rounded-tr-[50px]'>
      {/* Footer Top */}
      <div className='py-[60px] xl:pb-[100px] xl:pt-[130px]'>
        <div className='overflow-hidden'>
          {/* Footer Text Slider */}
          <div className='footer-text-slider flex w-full items-center gap-x-[30px] whitespace-nowrap'>
            {/* Footer Slide Item  */}
            <img
              src='assets/img/th-1/footer-text-slider-icon.svg'
              alt='footer-text-slider-icon'
              width={60}
              height={60}
              className='h-10 w-10 lg:h-[60px] lg:w-[60px]'
            />
            <div className='block font-dmSans text-4xl font-bold leading-none -tracking-[2px] text-black lg:text-6xl xl:text-7xl xxl:text-[80px]'>
              Начните своё будущее с нами!
            </div>
            {/* Footer Slide Item  */}
            {/* Footer Slide Item  */}
            <img
              src='assets/img/th-1/footer-text-slider-icon.svg'
              alt='footer-text-slider-icon'
              width={60}
              height={60}
              className='h-10 w-10 lg:h-[60px] lg:w-[60px]'
            />
            <div className='block font-dmSans text-4xl font-bold leading-none -tracking-[2px] text-black lg:text-6xl xl:text-7xl xxl:text-[80px]'>
              Начните своё будущее с нами!
            </div>
            {/* Footer Slide Item  */}
            {/* Footer Slide Item  */}
            <img
              src='assets/img/th-1/footer-text-slider-icon.svg'
              alt='footer-text-slider-icon'
              width={60}
              height={60}
              className='h-10 w-10 lg:h-[60px] lg:w-[60px]'
            />
            <div className='block font-dmSans text-4xl font-bold leading-none -tracking-[2px] text-black lg:text-6xl xl:text-7xl xxl:text-[80px]'>
              Начните своё будущее с нами!
            </div>
            {/* Footer Slide Item  */}
          </div>
        </div>
      </div>
      {/* Footer Text Slider */}
      {/* Footer Top */}
      <div className='global-container'>
        <div className='h-[1px] w-full bg-[#DBD6CF]' />
        {/* Footer Center */}
        <div className='lg grid grid-cols-1 gap-10 py-[60px] md:grid-cols-[1fr_auto_auto] xl:grid-cols-[1fr_auto_auto_1fr] xl:gap-20 xl:py-[100px]'>
          {/* Footer Widget */}
          <div className='flex flex-col gap-y-6'>
            <Link to='/' className='inline-block'>
              <img
                src='assets/img/th-1/logo.png'
                alt='logo'
                width={96}
                height={24}
              />
            </Link>
            <p>
              ул. Тест, 123, Талдыкорган
            </p>
            <p>
              +7 495 123 4567
            </p>
            <p>
              info@synaqtest.ru
            </p>
          </div>
          {/* Footer Widget */}
          {/* Footer Widget */}
          <div className='flex flex-col gap-y-6'>
            {/* Footer Title */}
            <h4 className='text-[21px] font-semibold capitalize text-black'>
              Популярные ссылки
            </h4>
            {/* Footer Title */}
            {/* Footer Navbar */}
            <ul className='flex flex-col gap-y-[10px] capitalize'>
              <li>
                <Link
                  to='/'
                  className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  to='/about'
                  className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  to='/services'
                  className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                >
                  Цены
                </Link>
              </li>
              <li>
                <Link
                  to='/pricing'
                  className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                >
                  Библиотека
                </Link>
              </li>
              <li>
                <Link
                  to='/contact'
                  className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          {/* Footer Widget */}
          {/* Footer Widget */}
          <div className='flex flex-col gap-y-6'>
            {/* Footer Title */}
            <h4 className='text-[21px] font-semibold capitalize text-black'>
              Другие страницы
            </h4>
            {/* Footer Title */}
            {/* Footer Navbar */}
            <ul className='flex flex-col gap-y-[10px] capitalize'>
              <li>
                <Link
                  to='/signup'
                  className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                >
                  Регистрация
                </Link>
              </li>
              <li>
                <Link
                  to='/login'
                  className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                >
                  Вход
                </Link>
              </li>
              <li>
                <Link
                  to='/error-404'
                  className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                >
                  404 страница
                </Link>
              </li>
              <li>
                <Link
                  to='/reset-password'
                  className='transition-all duration-300 ease-linear hover:text-colorOrangyRed'
                >
                  Восстановление пароля
                </Link>
              </li>
            </ul>
          </div>
          {/* Footer Widget */}
          {/* Footer Widget */}
          <div className='flex flex-col gap-y-6'>
            {/* Footer Title */}
            <h4 className='text-[21px] font-semibold capitalize text-black'>
              Рассылка на новости
            </h4>
            {/* Footer Title */}
            {/* Footer Subscriber Form */}
            <form onSubmit={handleSubmit}>
              <div className='relative h-[50px] max-w-[300px]'>
                <input
                  type='email'
                  name='newsletter-email'
                  id='newsletter-email'
                  placeholder='Ваш Email'
                  className='p-y-[18px] h-full w-full rounded-[50px] border-[1px] border-black px-[24px] pr-20 outline-none'
                  required=''
                />
                <button
                  type='submit'
                  className='absolute right-[5px] top-[50%] inline-block h-10 -translate-y-[50%] rounded-[50px] bg-black px-6 transition-all hover:bg-orange-500'
                >
                  <img
                    src='assets/img/th-1/arrow-right-large.svg'
                    alt='newsletter'
                  />
                </button>
              </div>
            </form>
            {/* Footer Subscriber Form */}
          </div>
          {/* Footer Widget */}
        </div>
        {/* Footer Center */}
        <div className='h-[1px] w-full bg-[#DBD6CF]' />
        {/* Footer Bottom */}
        <div className='py-9 text-center'>
          <p>
            © Copyright {new Date().getFullYear()}, Все права защищены @synaqtest
          </p>
        </div>
        {/* Footer Bottom */}
      </div>
      {/* Footer Background Shape 1  */}
      <div className='orange-gradient-2 absolute -top-[290px] right-[90px] -z-[1] h-[406px] w-[406px] -rotate-[58deg] rounded-[406px]'></div>
      {/* Footer Background Shape 2  */}
      <div className='orange-gradient-1 absolute -right-[200px] -top-[205px] -z-[1] h-[451px] w-[451px] -rotate-[58deg] rounded-[451px]'></div>
    </footer>
  );
};

export default Footer_01;
