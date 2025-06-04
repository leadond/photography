function SuccessModal({ isOpen, onClose, message }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden transform transition-all">
        <div className="bg-green-600 text-white py-4 px-6 flex justify-between items-center">
          <h3 className="text-xl font-medium">Success!</h3>
          <button onClick={onClose} className="text-white hover:text-gray-300 focus:outline-none">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check text-2xl text-green-600"></i>
          </div>
          <h4 className="text-xl font-medium mb-2">Thank You!</h4>
          <p className="text-gray-600 mb-6">{message || 'Your request has been processed successfully.'}</p>
          <button 
            onClick={onClose} 
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
