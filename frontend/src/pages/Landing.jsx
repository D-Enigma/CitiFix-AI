import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Brain,
  Camera,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  CheckCircle,
} from 'lucide-react'

function Landing() {
  // Use navigation to send users to the correct page based on login state.
  const navigate = useNavigate()

  // Send logged-in citizens directly to reporting and others to login.
  const handleReportIssue = () => {
    const token = localStorage.getItem('access_token')

    if (token) {
      navigate('/citizen/submit')
    } else {
      navigate('/login', {
        state: { redirectTo: '/citizen/submit' },
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="flex items-center justify-between h-20">

            <Link to="/" className="group">

              <h1 className="text-2xl font-bold tracking-tight">
                CitiFix <span className="text-blue-600">AI</span>
              </h1>

              <p className="text-xs text-slate-500 mt-0.5">
                Urban Infrastructure Intelligence
              </p>

            </Link>

            <div className="hidden md:flex items-center gap-8">

              <a
                href="#why-citifix"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Why CitiFix
              </a>

              <a
                href="#how-it-works"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                How It Works
              </a>

              <a
                href="#ai-detection"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                AI Detection
              </a>

            </div>

            <div className="flex items-center gap-3">

              <Link
                to="/login"
                className="hidden sm:inline-flex px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium hover:border-blue-300 hover:text-blue-600 transition-all"
              >
                Login
              </Link>

              {/* Use authentication-aware reporting from the public homepage. */}
              <button
                onClick={handleReportIssue}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 hover:shadow-md transition-all"
              >
                Report an Issue
                <ArrowRight size={17} />
              </button>

            </div>

          </div>

        </div>

      </nav>


      {/* Hero Section */}
      {/* Hero section with the real civic infrastructure image. */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 min-h-[680px] items-center">

            {/* Hero text content. */}
            <div className="relative z-10 py-16 lg:py-24 pr-0 lg:pr-12">

              {/* AI feature badge. */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                <Sparkles className="w-4 h-4" />
                AI-powered civic infrastructure reporting
              </div>

              {/* Main hero heading. */}
              <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.98] text-slate-950">
                Smarter
                <br />
                reporting.
                <br />
                <span className="text-blue-600">
                  Faster civic
                  <br />
                  action.
                </span>
              </h1>

              {/* Hero description. */}
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                CitiFix AI helps citizens report urban infrastructure problems
                through images, location intelligence and artificial intelligence —
                turning everyday observations into structured civic complaints.
              </p>

              {/* Hero action buttons. */}
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={handleReportIssue}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Report an Issue
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  See How It Works
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              {/* Key product benefits. */}
              <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Image-based reporting
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  AI-assisted analysis
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Location intelligence
                </div>
              </div>
            </div>

            {/* Real hero image replaces the old placeholder block. */}
            <div className="relative lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-[52%]">
              <img
                src="/images/hero.png"
                alt="Citizen using CitiFix AI to report a pothole"
                className="h-[500px] w-full object-cover object-center lg:h-full"
              />

              {/* Soft gradient blends the image naturally into the text area. */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent lg:w-1/2" />
            </div>

          </div>
        </div>
      </section>


      {/* Why CitiFix Section */}
      <section
        id="why-citifix"
        className="py-20 lg:py-24 bg-slate-50"
      >

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Why CitiFix AI?
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-slate-950">
              Turning everyday civic problems into actionable information.
            </h2>

            <p className="text-lg text-slate-600 mt-5 leading-relaxed">
              Urban infrastructure issues are often difficult to monitor
              efficiently when reports are scattered, incomplete or
              difficult to prioritize. CitiFix AI creates a structured
              digital workflow connecting citizens, AI analysis and
              municipal monitoring.
            </p>

          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">

            {/* Feature Card */}
            <div className="group bg-white rounded-2xl border border-slate-200 p-6 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 transition-all duration-300">

              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <Camera
                  size={23}
                  className="text-blue-600 group-hover:text-white transition-colors"
                />
              </div>

              <h3 className="text-lg font-bold mt-5">
                Image-Based Reporting
              </h3>

              <p className="text-slate-500 mt-2 leading-relaxed">
                Citizens can report visible infrastructure problems
                using photographs instead of lengthy manual descriptions.
              </p>

            </div>


            {/* Feature Card */}
            <div className="group bg-white rounded-2xl border border-slate-200 p-6 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 transition-all duration-300">

              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                <Brain
                  size={23}
                  className="text-purple-600 group-hover:text-white transition-colors"
                />
              </div>

              <h3 className="text-lg font-bold mt-5">
                AI Detection
              </h3>

              <p className="text-slate-500 mt-2 leading-relaxed">
                Computer vision analyzes submitted images to identify
                supported civic issue categories.
              </p>

            </div>


            {/* Feature Card */}
            <div className="group bg-white rounded-2xl border border-slate-200 p-6 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 transition-all duration-300">

              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                <MapPin
                  size={23}
                  className="text-green-600 group-hover:text-white transition-colors"
                />
              </div>

              <h3 className="text-lg font-bold mt-5">
                Location Intelligence
              </h3>

              <p className="text-slate-500 mt-2 leading-relaxed">
                Geographic coordinates help authorities understand where
                reported problems are occurring.
              </p>

            </div>


            {/* Feature Card */}
            <div className="group bg-white rounded-2xl border border-slate-200 p-6 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 transition-all duration-300">

              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                <Target
                  size={23}
                  className="text-orange-600 group-hover:text-white transition-colors"
                />
              </div>

              <h3 className="text-lg font-bold mt-5">
                Smart Prioritization
              </h3>

              <p className="text-slate-500 mt-2 leading-relaxed">
                AI results can contribute to severity and priority
                classification for better complaint management.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 lg:py-24 bg-white"
      >

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto">

            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Simple workflow
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-slate-950">
              How CitiFix AI works
            </h2>

            <p className="text-lg text-slate-600 mt-4">
              A simple reporting process connects citizens with an
              AI-assisted municipal monitoring workflow.
            </p>

          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">

            {/* Step 01 */}
            <div className="relative group">

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 h-full group-hover:border-blue-300 group-hover:shadow-lg transition-all duration-300">

                <div className="flex items-center justify-between">

                  <span className="text-4xl font-black text-blue-100 group-hover:text-blue-200 transition-colors">
                    01
                  </span>

                  <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Camera size={21} className="text-blue-600" />
                  </div>

                </div>

                <h3 className="text-xl font-bold mt-7">
                  Capture
                </h3>

                <p className="text-slate-500 mt-2 leading-relaxed">
                  Take a photograph of the visible civic infrastructure
                  problem.
                </p>

              </div>

            </div>


            {/* Step 02 */}
            <div className="relative group">

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 h-full group-hover:border-blue-300 group-hover:shadow-lg transition-all duration-300">

                <div className="flex items-center justify-between">

                  <span className="text-4xl font-black text-blue-100 group-hover:text-blue-200 transition-colors">
                    02
                  </span>

                  <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Upload size={21} className="text-blue-600" />
                  </div>

                </div>

                <h3 className="text-xl font-bold mt-7">
                  Submit
                </h3>

                <p className="text-slate-500 mt-2 leading-relaxed">
                  Upload the image and provide the complaint location
                  and relevant details.
                </p>

              </div>

            </div>


            {/* Step 03 */}
            <div className="relative group">

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 h-full group-hover:border-blue-300 group-hover:shadow-lg transition-all duration-300">

                <div className="flex items-center justify-between">

                  <span className="text-4xl font-black text-blue-100 group-hover:text-blue-200 transition-colors">
                    03
                  </span>

                  <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Brain size={21} className="text-blue-600" />
                  </div>

                </div>

                <h3 className="text-xl font-bold mt-7">
                  AI Analysis
                </h3>

                <p className="text-slate-500 mt-2 leading-relaxed">
                  The trained computer vision models analyze the image
                  for supported civic issues.
                </p>

              </div>

            </div>


            {/* Step 04 */}
            <div className="relative group">

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 h-full group-hover:border-blue-300 group-hover:shadow-lg transition-all duration-300">

                <div className="flex items-center justify-between">

                  <span className="text-4xl font-black text-blue-100 group-hover:text-blue-200 transition-colors">
                    04
                  </span>

                  <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                    <CheckCircle2 size={21} className="text-blue-600" />
                  </div>

                </div>

                <h3 className="text-xl font-bold mt-7">
                  Track & Resolve
                </h3>

                <p className="text-slate-500 mt-2 leading-relaxed">
                  Authorities can monitor complaints while citizens can
                  track their submitted reports.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* AI Detection Section */}
      <section
        id="ai-detection"
        className="py-20 lg:py-24 bg-slate-950 text-white"
      >

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
              Computer Vision
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              What can CitiFix AI detect?
            </h2>

            <p className="text-lg text-slate-400 mt-4 leading-relaxed">
              CitiFix currently focuses on three trained civic issue
              categories. Each submitted image is analyzed by the
              appropriate computer vision models.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-6 mt-12">

            {/* Pothole Card */}
            <div className="group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl transition-all duration-300">

              {/* Show the real pothole detection image. */}
              <div className="h-56 overflow-hidden">
                <img
                  src="/images/pothole.png"
                  alt="Pothole detected on a road"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">

                <div className="flex items-center justify-between">

                  <h3 className="text-xl font-bold">
                    Pothole
                  </h3>

                  <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">
                    AI Model
                  </span>

                </div>

                <p className="text-slate-400 mt-3 leading-relaxed">
                  Detect road surface damage represented by potholes
                  in submitted images.
                </p>

              </div>

            </div>


            {/* Waterlogging Card */}
            <div className="group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-2xl transition-all duration-300">

              {/* Show the real waterlogging detection image. */}
              <div className="h-56 overflow-hidden">
                <img
                  src="/images/waterlogging.png"
                  alt="Waterlogged urban road"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">

                <div className="flex items-center justify-between">

                  <h3 className="text-xl font-bold">
                    Waterlogging
                  </h3>

                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400">
                    AI Model
                  </span>

                </div>

                <p className="text-slate-400 mt-3 leading-relaxed">
                  Analyze images for waterlogging-related visual
                  conditions using the trained model.
                </p>

              </div>

            </div>


            {/* Garbage Card */}
            <div className="group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 hover:-translate-y-2 hover:border-green-500/50 hover:shadow-2xl transition-all duration-300">

              {/* Show the real garbage detection image. */}
              <div className="h-56 overflow-hidden">
                <img
                  src="/images/garbage.png"
                  alt="Garbage accumulation in an urban area"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">

                <div className="flex items-center justify-between">

                  <h3 className="text-xl font-bold">
                    Garbage Accumulation
                  </h3>

                  <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400">
                    AI Model
                  </span>

                </div>

                <p className="text-slate-400 mt-3 leading-relaxed">
                  Detect supported garbage-related objects using the
                  trained computer vision model.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


            {/* Municipal Workflow */}
      {/* Municipal section now follows the same full-image visual style as the hero. */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 min-h-[680px] items-center">

            {/* Municipal workflow text content. */}
            <div className="relative z-10 py-16 lg:py-24 pr-0 lg:pr-12">

              {/* Section label. */}
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                From Report to Action
              </p>

              {/* Main municipal workflow heading. */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 text-slate-950 leading-tight">
                Connecting citizens with
                <br />
                municipal action.
              </h2>

              {/* Explain how the platform connects citizens and authorities. */}
              <p className="text-lg text-slate-600 mt-5 leading-relaxed max-w-xl">
                CitiFix AI creates a structured flow from the moment a
                citizen submits an image to the point where authorities
                monitor and resolve the complaint.
              </p>

              {/* Municipal workflow steps. */}
              <div className="space-y-5 mt-9">

                {/* Structured complaints step. */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <ClipboardList
                      size={21}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Structured complaints
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Images, descriptions and location information are
                      stored together as a complaint record.
                    </p>
                  </div>
                </div>

                {/* AI prioritization step. */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                    <Target
                      size={21}
                      className="text-green-600"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      AI-assisted prioritization
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      AI analysis contributes to severity and priority
                      classification.
                    </p>
                  </div>
                </div>

                {/* Geographic monitoring step. */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                    <MapPin
                      size={21}
                      className="text-purple-600"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Geographic monitoring
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Complaint coordinates can be visualized on the
                      municipal map.
                    </p>
                  </div>
                </div>

                {/* Status tracking step. */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
                    <ShieldCheck
                      size={21}
                      className="text-orange-600"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Status tracking
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Complaints move through a defined municipal
                      workflow from submission to resolution.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Municipal image now fills the right side like the hero image. */}
            <div className="relative lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-[52%]">

              <img
                src="/images/municipal.png"
                alt="Municipal staff monitoring civic complaints"
                className="h-[500px] w-full object-cover object-center lg:h-full"
              />

              {/* Fade the image naturally into the white content area. */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent lg:w-1/2" />

            </div>

          </div>
        </div>
      </section>


      {/* Final CTA */}
      <section className="relative overflow-hidden bg-blue-600">

        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 py-20 text-center">

          <p className="text-blue-100 text-sm font-bold uppercase tracking-widest">
            Make your city better
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            See a civic problem?
          </h2>

          <p className="text-lg text-blue-100 max-w-2xl mx-auto mt-5 leading-relaxed">
            Report it with CitiFix AI and help create a clearer,
            data-driven picture of the problems affecting your city.
          </p>

          {/* Start the authentication-aware reporting flow. */}
          <button
            onClick={handleReportIssue}
            className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-white text-blue-700 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Report an Issue
            <ArrowRight size={19} />
          </button>

        </div>

      </section>


      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

          <div className="flex flex-col md:flex-row items-center justify-between gap-5">

            <div className="text-center md:text-left">

              <h3 className="text-xl font-bold text-white">
                CitiFix <span className="text-blue-500">AI</span>
              </h3>

              <p className="text-sm mt-1">
                Urban Infrastructure Intelligence
              </p>

            </div>

            <p className="text-sm text-center">
              CitiFix AI — Urban Infrastructure Monitoring Platform
            </p>

          </div>

          <div className="border-t border-slate-800 mt-8 pt-6 text-center text-xs text-slate-500">
            AI-assisted civic reporting • Location intelligence • Municipal monitoring
          </div>

        </div>

      </footer>

    </div>
  )
}

export default Landing