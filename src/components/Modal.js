import Search from "./Search"
import close from '../assets/arrow-left.svg'

const Modal = ({modal, setModal, setWeather, setReverseGeo}) => {

  return (
    <div className={modal ? 'modal active' : 'modal'} onClick={() => setModal(false)}>
        <div className={modal ? 'modal-content active' : 'modal-content'} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(false)}><img src={close} alt="close-icon" /></button>
            <Search modal={modal} setModal={setModal} setWeather={setWeather} setReverseGeo={setReverseGeo}/>
        </div>
    </div>
  );

};

export default Modal;