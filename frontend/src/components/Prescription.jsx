import React from "react";

const Prescription = ({ formData }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 bg-white border rounded-lg shadow-lg max-w-2xl mx-auto">
      {/* Hospital / Doctor Header */}
      <div className="text-center border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold">Prescripto Clinic</h1>
        <p className="text-gray-600">Dr. John Smith (MBBS, MD)</p>
        <p className="text-gray-500">Phone: +91 98765 43210</p>
      </div>

      {/* Patient Info */}
      <div className="mb-6">
        <p><span className="font-semibold">Patient Name:</span> {formData.name || "_________"}</p>
        <p><span className="font-semibold">Age:</span> {formData.age || "____"} years</p>
        <p><span className="font-semibold">Disease / Symptoms:</span> {formData.disease || "___________________"}</p>
        <p><span className="font-semibold">Date:</span> {new Date().toLocaleDateString()}</p>
      </div>

      {/* Prescription Box */}
      <div className="border-t border-b py-8 mb-6 min-h-[200px]">
        <h2 className="text-xl font-semibold mb-2">Prescription:</h2>
        <p className="text-gray-400 italic">Write medicines here...</p>
      </div>

      {/* Doctor Signature */}
      <div className="flex justify-end">
        <div>
          <p className="font-semibold">Signature</p>
          <p className="text-gray-400">__________________</p>
        </div>
      </div>

      {/* Print Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Print Prescription
        </button>
      </div>
    </div>
  );
};

export default Prescription;
