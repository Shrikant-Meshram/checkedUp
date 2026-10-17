import React, { useContext, useMemo, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { BookOpen, ChevronDown, ListChecks, LifeBuoy } from 'lucide-react'

const Section = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-border rounded-xl bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-accent/50 transition"
      >
        <span className="flex items-center gap-3 min-w-0">
          {Icon && (
            <span className="w-8 h-8 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Icon size={16} />
            </span>
          )}
          <span className="type-primary-body-b2-medium text-foreground truncate">{title}</span>
        </span>
        <ChevronDown size={18} className={`shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-4 pb-4 pt-1 border-t border-border space-y-3">{children}</div>}
    </div>
  )
}

const Steps = ({ items }) => (
  <ol className="space-y-2 list-decimal list-inside marker:text-primary marker:font-medium">
    {items.map((step, i) => (
      <li key={i} className="type-primary-body-b2 text-foreground leading-relaxed">{step}</li>
    ))}
  </ol>
)

const Tip = ({ children }) => (
  <div className="rounded-lg bg-primary/10 border border-primary/20 px-3 py-2 type-primary-body-b2 text-primary">
    {children}
  </div>
)

const StatusFlow = ({ steps }) => (
  <div className="flex flex-wrap items-center gap-1.5">
    {steps.map((s, i) => (
      <React.Fragment key={s}>
        <span className="px-2 py-1 rounded-md bg-accent type-primary-body-b3-medium text-foreground">{s}</span>
        {i < steps.length - 1 && <span className="text-muted-foreground type-primary-body-b3">→</span>}
      </React.Fragment>
    ))}
  </div>
)

const DataTable = ({ headers, rows }) => (
  <div className="overflow-x-auto border border-border rounded-lg">
    <table className="w-full type-primary-body-b2">
      <thead className="bg-accent text-left">
        <tr>
          {headers.map((h) => (
            <th key={h} className="px-3 py-2 type-primary-body-b3-medium text-muted-foreground">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-t border-border">
            {row.map((cell, j) => (
              <td key={j} className="px-3 py-2 text-foreground">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const roleContent = {
  patient: (
    <>
      <Section title="Book a Test" icon={BookOpen} defaultOpen>
        <Steps items={[
          'Go to Tests or Packages and click Book.',
          'Enter your name, age, gender, and phone number.',
          'Enter your address and pincode. Set your location on the map if you can.',
          'Pick a date and time slot.',
          'Check the summary and confirm.',
          'You will get a booking ID and a WhatsApp message.',
        ]} />
        <Tip>You can book for yourself or your family member.</Tip>
      </Section>

      <Section title="My Bookings" icon={ListChecks}>
        <Steps items={[
          'Go to My Bookings in the sidebar.',
          'See your booking status, lab, and payment details.',
          'Click a booking to view full details.',
          'Cancel or reschedule if needed (give a reason).',
        ]} />
      </Section>

      <Section title="Payment" icon={ListChecks}>
        <p className="type-primary-body-b2 text-foreground">Pay the lab assistant at your door. You can pay by UPI or cash.</p>
      </Section>

      <Section title="My Reports" icon={LifeBuoy}>
        <Steps items={[
          'Go to My Reports in the sidebar.',
          'View or download your report when it is ready.',
          'You will also get a WhatsApp message when the report is ready.',
        ]} />
      </Section>
    </>
  ),

  admin: (
    <>
      <Section title="Manage Tests & Packages" icon={BookOpen} defaultOpen>
        <Steps items={[
          'Go to Tests or Packages.',
          'Click Create to add a new test or package.',
          'Use the edit icon to change details.',
          'Use delete to remove one.',
        ]} />
      </Section>

      <Section title="Manage Lab Owners" icon={ListChecks}>
        <Steps items={[
          'Go to Lab Owners.',
          'Click Add Lab Owner.',
          'Fill lab details, address, and location.',
          'Upload the required documents.',
        ]} />
      </Section>

      <Section title="Manage Bookings" icon={ListChecks}>
        <Steps items={[
          'Go to Bookings.',
          'Use filters to find a booking.',
          'Assign a lab using the edit icon.',
          'You can also view details and download reports.',
        ]} />
        <Tip>Once the lab assistant reaches the patient, the lab cannot be changed.</Tip>
      </Section>

      <Section title="Payments" icon={ListChecks}>
        <Steps items={[
          'Go to Payments to see all payments.',
          'Filter by UPI or cash, date, or status.',
          'Open Payment Settings to update the UPI QR code.',
        ]} />
      </Section>

      <Section title="Settings" icon={LifeBuoy}>
        <Steps items={[
          'Go to Settings.',
          'Roles: manage user permissions.',
          'Categories: manage test categories.',
          'Commission: set how commission is split.',
        ]} />
      </Section>

      <Section title="Settlements" icon={ListChecks}>
        <Steps items={[
          'Go to Settlements.',
          'Select completed paid bookings.',
          'Click Send and enter UTR number and bank name.',
          'For multiple bookings of the same lab, use bulk send.',
          'Export history when needed.',
        ]} />
      </Section>
    </>
  ),

  lab_owner: (
    <>
      <Section title="Assign Assistants" icon={ListChecks} defaultOpen>
        <Steps items={[
          'Go to Bookings.',
          'Find a booking with status Pending or Assigned.',
          'Use the Assign Assistant dropdown to pick your assistant.',
        ]} />
        <Tip>Only assistants from your lab can be assigned.</Tip>
      </Section>

      <Section title="Manage Assistants" icon={BookOpen}>
        <Steps items={[
          'Go to Assistants.',
          'Click Add Assistant.',
          'Enter name, email, phone, and password.',
          'Upload the ID proof document.',
          'View, edit, or delete assistants from the list.',
        ]} />
      </Section>

      <Section title="Upload Reports" icon={LifeBuoy}>
        <Steps items={[
          'Go to Bookings or Upload Reports.',
          'Find a booking where sample is collected and payment is done.',
          'Click Upload Report and select the file.',
          'The patient will get a WhatsApp message.',
        ]} />
      </Section>

      <Section title="Payments" icon={ListChecks}>
        <Steps items={[
          'Go to Payments to see payments for your lab.',
          'See commission and lab share for each payment.',
        ]} />
      </Section>

      <Section title="Settlements" icon={ListChecks}>
        <Steps items={[
          'Go to Settlements.',
          'See bookings ready for settlement.',
          'When admin sends payment, click Verify to confirm.',
          'View and export settlement history.',
        ]} />
      </Section>
    </>
  ),

  lab_assistant: (
    <>
      <Section title="Your Daily Work" icon={ListChecks} defaultOpen>
        <p className="type-primary-body-b2 text-muted-foreground">Follow these steps for each home visit:</p>
        <Steps items={[
          'Open Bookings to see your assigned work.',
          'Navigate to the patient using the map.',
          'Click Mark Reached when you arrive.',
          'If patient wants extra tests, use Add Tests.',
          'Collect the sample. Take at least 1 photo of the sample.',
          'Collect payment by UPI or cash.',
        ]} />
      </Section>

      <Section title="Collect Payment" icon={BookOpen}>
        <Steps items={[
          'Open the booking and click Collect Payment.',
          'Choose UPI or Cash.',
          'For UPI: show the QR code and upload the payment screenshot.',
          'For Cash: no receipt needed.',
          'Submit to confirm.',
        ]} />
      </Section>

      <Section title="What Each Status Means" icon={LifeBuoy}>
        <DataTable
          headers={['Status', 'What To Do']}
          rows={[
            ['Assigned', 'Go to the patient'],
            ['Reached', 'You have arrived. Collect sample next.'],
            ['Sample Collected', 'Collect payment'],
            ['Processing', 'Wait for lab to finish'],
            ['Report Ready / Completed', 'Work is done'],
          ]}
        />
      </Section>
    </>
  ),
}

const HelpManual = () => {
  const { user } = useContext(AuthContext)
  const role = user?.role || 'patient'
  const roleLabel = useMemo(() => ({
    patient: 'Patient',
    admin: 'Administrator',
    lab_owner: 'Lab Owner',
    lab_assistant: 'Lab Assistant',
  }[role] || role), [role])

  return (
    <section className="space-y-6 max-w-4xl">
      <div className="flex gap-3 items-start">
        <div className="w-11 h-11 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <BookOpen size={22} />
        </div>
        <div>
          <h1 className="type-primary-heading-h1 !font-medium text-foreground">Help Manual</h1>
          <p className="mt-1 type-primary-body-b2 text-muted-foreground">{roleLabel} — How to use the platform</p>
        </div>
      </div>

      <div className="space-y-3">
        {roleContent[role] || roleContent.patient}
      </div>
    </section>
  )
}

export default HelpManual
