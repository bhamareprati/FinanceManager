import React from "react";

function EditFormModel({ showModal, selectedTransaction, setSelectedTransaction, handleUpdate, setShowModal }) {
  if (!showModal || !selectedTransaction) return null; 

  return (
    <div className="modal-overlay d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50">
      <div className="modal-content w-50 p-4 bg-white rounded shadow-lg border mx-auto">
        <h3 className="mb-3 text-center fw-bold">Edit Transaction</h3>
        <form onSubmit={(e) => handleUpdate(e)} className="fw-bold">
          <div className="mb-2 ">
            <label className="form-label">Title:</label>
            <input
              type="text"
              className="form-control"
              value={selectedTransaction.title}
              onChange={(e) => setSelectedTransaction({ ...selectedTransaction, title: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Amount:</label>
            <input
              type="number"
              className="form-control"
              value={selectedTransaction.amount}
              onChange={(e) => setSelectedTransaction({ ...selectedTransaction, amount: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Category:</label>
            <input
              type="text"
              className="form-control"
              value={selectedTransaction.category}
              onChange={(e) => setSelectedTransaction({ ...selectedTransaction, category: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Type:</label>
            <select
              className="form-select"
              value={selectedTransaction.type}
              onChange={(e) => setSelectedTransaction({ ...selectedTransaction, type: e.target.value })}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="form-label">Date:</label>
            <input
              type="date"
              className="form-control"
              value={selectedTransaction.date.split("T")[0]}
              onChange={(e) => setSelectedTransaction({ ...selectedTransaction, date: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description:</label>
            <textarea
              className="form-control"
              value={selectedTransaction.description}
              onChange={(e) => setSelectedTransaction({ ...selectedTransaction, description: e.target.value })}
            ></textarea>
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary me-2">Update</button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditFormModel;
