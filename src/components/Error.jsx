import  MinErr from '../assets/img/MiniomError.jpg'

const Error = () => {
  return (
      <div className="error-container">
        <img src={MinErr} alt="" className='img-error' />
        <p>Error 404, Page Not Found</p>
      </div>
  )
}

export default Error