import CareersContent from '../../components/CareersContent';
export default function CareersPage() {
  return(
    <div className="min-h-screen bg-gray-950 text-white p-6 sm:p-10">
  <div className="max-w-6xl mx-auto">
    <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center text-indigo-400">
      Get in Touch
    </h1>

    <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto mb-10 text-center">
      We’d love to hear from you! Whether you have questions, feedback, or partnership inquiries, 
      our team is ready to assist. Fill out the form below or reach us through our contact details.
    </p>

    <CareersContent />
  </div>
</div>

  );
}