import logo from '../../assets/404.png'

export const NotFound = () => (
  <div className='flex justify-center items-center min-h-screen'>
    <img 
    src={logo} 
    alt = '404 Не найдено' 
    className="w-48 sm:w-64 md:w-72 lg:w-96 h-auto max-w-full"
    ></img>
  </div>
)
