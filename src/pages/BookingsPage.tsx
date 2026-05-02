"use client";

import {
  createPublicBooking,
  getPublicServices,
  getPublicStaff,
  getAvailabilitySlots,
  getBranches,
  getBookingForm,
  getSchedulingPageBySlug,
  type PublicService,
  type PublicStaff,
  type PublicBranch,
  type PublicBookingForm,
  type PublicSchedulingPage,
} from "../services/publicApi";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Calendar, Clock, User, FileText, Check, X, CheckCircle2, MapPin } from "lucide-react";
import spa08 from "../assets/spa/spa-08.jpg";
import { PageHero } from "../components/site/PageHero";

type BookingSession = {
  serviceId: string;
  staffId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  resourceIds?: string[];
  resourceName?: string; // Room name for display
  notes?: string;
};

type BookingForm = {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
};

function AppointmentsContent() {
  const [searchParams] = useSearchParams();
  const preSelectedServiceId = searchParams.get("serviceId");
  const branchSlugParam = searchParams.get("branchSlug") || searchParams.get("branch");
  const branchIdParam = searchParams.get("branchId");
  const schedulingPageSlug = searchParams.get("schedulingPage");
  
  const [step, setStep] = useState(0);
  const [branches, setBranches] = useState<PublicBranch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<PublicBranch | null>(null);
  const [loadingBranches, setLoadingBranches] = useState(true);
  const [schedulingPage, setSchedulingPage] = useState<PublicSchedulingPage | null>(null);
  const [services, setServices] = useState<PublicService[]>([]);
  const [staff, setStaff] = useState<PublicStaff[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [selectedServices, setSelectedServices] = useState<string[]>(preSelectedServiceId ? [preSelectedServiceId] : []);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [availableDates, setAvailableDates] = useState<{ date: string; available: boolean }[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [availableSlotsData, setAvailableSlotsData] = useState<Record<string, Array<{ time: string; staffId: string; staffName: string; resourceId?: string; resourceName?: string }>>>({});
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [form, setForm] = useState<BookingForm>({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    notes: "",
  });
  const [sessions, setSessions] = useState<BookingSession[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [lastCreatedAppointmentIds, setLastCreatedAppointmentIds] = useState<string[]>([]);
  const [lastCreatedClientEmail, setLastCreatedClientEmail] = useState<string>("");
  const [bookingForm, setBookingForm] = useState<PublicBookingForm>(null);
  const [loadingBookingForm, setLoadingBookingForm] = useState(false);
  const [intakeValues, setIntakeValues] = useState<Record<string, string | number | boolean | string[]>>({});

  useEffect(() => {
    getBranches()
      .then((list) => {
        setBranches(list);
        if (branchIdParam) {
          const b = list.find((x) => x.id === branchIdParam);
          if (b) setSelectedBranch(b);
        } else {
          const slug = branchSlugParam;
          if (slug) {
            const b = list.find((x) => x.slug === slug);
            if (b) setSelectedBranch(b);
          } else if (list.length === 1) {
            setSelectedBranch(list[0]);
          }
        }
        if (list.length === 1) setStep(1);
      })
      .catch((err) => {
        console.error("Failed to fetch branches:", err);
        setApiError(`Failed to load locations: ${err instanceof Error ? err.message : "Unknown error"}`);
      })
      .finally(() => setLoadingBranches(false));
  }, [branchSlugParam, branchIdParam]);

  useEffect(() => {
    if (!selectedBranch) return;
    const branchId = selectedBranch.id;
    const branchSlug = selectedBranch.slug;
    setLoadingServices(true);
    setLoadingStaff(true);
    getPublicServices(branchId, branchSlug)
      .then(setServices)
      .catch((err) => {
        console.error("Failed to fetch services:", err);
        setApiError(`Failed to load services: ${err instanceof Error ? err.message : "Unknown error"}`);
      })
      .finally(() => setLoadingServices(false));
    getPublicStaff(branchId, branchSlug)
      .then(setStaff)
      .catch((err) => {
        console.error("Failed to fetch staff:", err);
        setApiError(`Failed to load staff: ${err instanceof Error ? err.message : "Unknown error"}`);
      })
      .finally(() => setLoadingStaff(false));
  }, [selectedBranch]);

  // Fetch scheduling page when branch + slug are set (e.g. from /book/[slug]?branchId=)
  useEffect(() => {
    if (!selectedBranch || !schedulingPageSlug) {
      setSchedulingPage(null);
      return;
    }
    getSchedulingPageBySlug(selectedBranch.id, schedulingPageSlug)
      .then(setSchedulingPage)
      .catch(() => setSchedulingPage(null));
  }, [selectedBranch?.id, schedulingPageSlug]);

  // Filter services and staff by scheduling page when set
  const servicesFiltered = schedulingPage?.serviceIds?.length
    ? services.filter((s) => schedulingPage.serviceIds.includes(s.id))
    : services;
  const staffFiltered = schedulingPage?.staffIds?.length
    ? staff.filter((s) => schedulingPage.staffIds.includes(s.id))
    : staff;

  // Fetch availability when services are selected and we're on step 2 (and branch selected if multi-branch)
  useEffect(() => {
    if (step === 2 && selectedServices.length > 0 && (branches.length <= 1 || selectedBranch)) {
      fetchAvailability();
    }
  }, [currentMonth, selectedServices, step, branches.length, selectedBranch]);

  // Fetch booking intake form when on step 4 (your information) with branch + service
  const firstSessionServiceId = sessions[0]?.serviceId;
  useEffect(() => {
    if (step !== 4 || !selectedBranch || !firstSessionServiceId) return;
    setLoadingBookingForm(true);
    getBookingForm({ branchId: selectedBranch.id, serviceId: firstSessionServiceId })
      .then((form) => {
        setBookingForm(form);
        if (form?.fields) {
          setIntakeValues((prev) => {
            const next = { ...prev };
            form.fields.forEach((f) => {
              if (next[f.id] === undefined) {
                if (f.type === "CHECKBOX") next[f.id] = false;
                else if (f.type === "NUMBER") next[f.id] = "";
                else next[f.id] = "";
              }
            });
            return next;
          });
        }
      })
      .catch(() => setBookingForm(null))
      .finally(() => setLoadingBookingForm(false));
  }, [step, selectedBranch?.id, firstSessionServiceId]);

  // Update time slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      // Check if we have slots for this date
      if (availableSlotsData[selectedDate] && availableSlotsData[selectedDate].length > 0) {
        // Get unique time slots
        const uniqueTimes = Array.from(new Set(availableSlotsData[selectedDate].map(slot => slot.time))).sort();
        setAvailableTimeSlots(uniqueTimes);
      } else {
        setAvailableTimeSlots([]);
        // Clear selected time if no slots available for this date
        setSelectedTime("");
      }
    } else {
      setAvailableTimeSlots([]);
      setSelectedTime("");
    }
  }, [selectedDate, availableSlotsData]);

  const fetchAvailability = async () => {
    if (selectedServices.length === 0) return;
    
    setLoadingAvailability(true);
    try {
      // Get availability for the first selected service (we'll use the first one for calendar)
      const serviceId = selectedServices[0];
      
      // Calculate date range for current month
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      
      const branchId = selectedBranch?.id;
      const branchSlug = selectedBranch?.slug;
      const availability = await getAvailabilitySlots({
        serviceId,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        ...(branchId && { branchId }),
        ...(branchSlug && { branchSlug }),
      });

      const slotsData = availability.slotsByDate || {};
      setAvailableSlotsData(slotsData);
      
      // Generate calendar dates with availability
      const dates: { date: string; available: boolean }[] = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      
      for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        if (date >= today) {
          // Format date as YYYY-MM-DD in local timezone (avoid UTC conversion)
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const hasSlots = availability.availableDates?.includes(dateStr) || false;
          dates.push({ date: dateStr, available: hasSlots });
        }
      }

      setAvailableDates(dates);
    } catch (error) {
      console.error('Failed to fetch availability:', error);
      // Fallback to showing all dates as potentially available
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const endDate = new Date(year, month + 1, 0);
      const dates: { date: string; available: boolean }[] = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let day = 1; day <= endDate.getDate(); day++) {
        const date = new Date(year, month, day);
        if (date >= today) {
          // Format date as YYYY-MM-DD in local timezone (avoid UTC conversion)
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          dates.push({ date: dateStr, available: true });
        }
      }
      setAvailableDates(dates);
    } finally {
      setLoadingAvailability(false);
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  const handleNext = () => {
    if (step === 0) {
      if (!selectedBranch && branches.length > 1) {
        setError("Please select a location");
        return;
      }
      setError(null);
      setStep(1);
    } else if (step === 1) {
      if (selectedServices.length === 0) {
        setError("Please select at least one service");
        return;
      }
      setError(null);
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate || !selectedTime) {
        setError("Please select a date and time");
        return;
      }
      setError(null);
      setStep(3);
    } else if (step === 3) {
      if (!selectedStaff) {
        setError("Please select a staff member");
        return;
      }
      // Add session to list (include resourceIds and room name from slot when service requires room)
      const service = services.find((s) => s.id === selectedServices[0]);
      if (service) {
        const daySlots = availableSlotsData[selectedDate] || [];
        const slot = daySlots.find((s) => s.time === selectedTime && s.staffId === selectedStaff);
        const resourceIds = slot?.resourceId ? [slot.resourceId] : undefined;
        const resourceName = slot?.resourceName;
        setSessions((prev) => [
          ...prev,
          {
            serviceId: selectedServices[0],
            staffId: selectedStaff,
            date: selectedDate,
            time: selectedTime,
            ...(resourceIds && { resourceIds }),
            ...(resourceName && { resourceName }),
          },
        ]);
        // Reset for next session or move to final step
        if (selectedServices.length > 1) {
          // More services to book
          setSelectedServices((prev) => prev.slice(1));
          setSelectedDate("");
          setSelectedTime("");
          setSelectedStaff("");
          setStep(2);
        } else {
          // All services booked, move to final step
          setStep(4);
        }
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setError(null);
    }
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    if (!form.clientName || (!form.clientEmail && !form.clientPhone)) {
      setError("Please provide your name and either email or phone number.");
      setSubmitting(false);
      return;
    }

    if (bookingForm?.fields) {
      for (const f of bookingForm.fields) {
        if (f.required) {
          const v = intakeValues[f.id];
          if (v === undefined || v === "" || v === null) {
            setError(`Please fill in: ${f.label}`);
            setSubmitting(false);
            return;
          }
        }
      }
    }

    if (sessions.length === 0) {
      setError("Please complete at least one booking session.");
      setSubmitting(false);
      return;
    }

    try {
      // Create bookings for all sessions
      const branchId = selectedBranch?.id;
      const branchSlug = selectedBranch?.slug;
      const intakeResponses: Record<string, unknown> = {};
      if (bookingForm?.fields) {
        bookingForm.fields.forEach((f) => {
          const v = intakeValues[f.id];
          if (v !== undefined && v !== "" && v !== null) intakeResponses[f.id] = v;
        });
      }

      const bookingPromises = sessions.map((session) =>
        createPublicBooking({
          clientInfo: {
            name: form.clientName,
            email: form.clientEmail || undefined,
            phone: form.clientPhone || undefined,
            timezone:
              typeof Intl !== "undefined"
                ? Intl.DateTimeFormat?.().resolvedOptions?.().timeZone
                : undefined,
          },
          staffId: session.staffId,
          serviceId: session.serviceId,
          startTime: `${session.date}T${session.time}:00`,
          notes: session.notes || form.notes || undefined,
          ...(session.resourceIds && session.resourceIds.length > 0 && { resourceIds: session.resourceIds }),
          ...(branchId && { branchId }),
          ...(branchSlug && { branchSlug }),
          ...(Object.keys(intakeResponses).length > 0 && { intakeResponses }),
        })
      );

      const results = await Promise.all(bookingPromises);
      const createdIds = results.map((r) => r.id);

      setLastCreatedAppointmentIds(createdIds);
      setLastCreatedClientEmail(form.clientEmail || "");
      setSuccessMessage(`Successfully booked ${sessions.length} appointment${sessions.length > 1 ? "s" : ""}.`);
      setShowSuccessModal(true);

      // Reset form
      setStep(branches.length > 1 ? 0 : 1);
      setSelectedServices([]);
      setSelectedDate("");
      setSelectedTime("");
      setSelectedStaff("");
      setSessions([]);
      setForm({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        notes: "",
      });
      setIntakeValues({});
      setBookingForm(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      console.error("Booking error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedServiceData = services.filter((s) => selectedServices.includes(s.id));
  const totalDuration = selectedServiceData.reduce((sum, s) => sum + s.duration, 0);
  const totalPrice = selectedServiceData.reduce((sum, s) => sum + s.price, 0);

  const steps =
    branches.length > 1
      ? [
          { number: 0, title: "Select Location", icon: MapPin },
          { number: 1, title: "Select Services", icon: Check },
          { number: 2, title: "Choose Date & Time", icon: Calendar },
          { number: 3, title: "Select Staff", icon: User },
          { number: 4, title: "Your Information", icon: FileText },
        ]
      : [
          { number: 1, title: "Select Services", icon: Check },
          { number: 2, title: "Choose Date & Time", icon: Calendar },
          { number: 3, title: "Select Staff", icon: User },
          { number: 4, title: "Your Information", icon: FileText },
        ];
  const currentStepIndex = Math.max(
    steps.findIndex((stepItem) => stepItem.number === step),
    0
  );
  const progressPercent =
    steps.length > 1 ? Math.round((currentStepIndex / (steps.length - 1)) * 100) : 100;
  const activeService = services.find((service) => service.id === selectedServices[0]);
  const panelClass =
    "rounded-3xl border border-[#d9cee6] bg-white/95 p-6 shadow-[0_24px_48px_-34px_rgba(37,20,53,0.35)] backdrop-blur md:p-7";
  const inputClass =
    "mt-2 w-full rounded-xl border border-[#d9cee6] bg-white px-4 py-2.5 text-sm text-[#241a2f] shadow-sm outline-none transition duration-200 focus:border-[#5c3f73] focus:ring-4 focus:ring-[#9a80b0]/20";
  const selectCardBase =
    "rounded-2xl border-2 p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-md";
  const hero = {
    label: "Bookings",
    title: "Book Appointment",
    description:
      "Select your services, choose a time, and confirm your details in a seamless booking flow.",
    image: spa08,
    primaryCta: {
      to: "/treatments",
      label: "Explore Treatments",
    },
    secondaryCta: {
      to: "/products",
      label: "View Products",
    },
  };

  return (
    <>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#130d1b]/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white shadow-[0_30px_80px_-24px_rgba(21,11,31,0.6)]">
            <div className="space-y-6 p-8">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-100/70">
                  <CheckCircle2 className="h-9 w-9 text-emerald-600" aria-hidden />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold tracking-tight text-[#241a2f]">Booking confirmed</h3>
                <p className="text-sm text-[#5f4f70]">{successMessage}</p>
              </div>

              {lastCreatedAppointmentIds.length > 0 && lastCreatedClientEmail && (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                  <p className="text-sm text-emerald-900">
                    We have saved your appointment and sent your confirmation to{" "}
                    <span className="font-semibold">{lastCreatedClientEmail}</span>.
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  setSuccessMessage("");
                  setLastCreatedAppointmentIds([]);
                  setLastCreatedClientEmail("");
                }}
                className="w-full rounded-2xl bg-[#5c3f73] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4b335f]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[radial-gradient(120%_120%_at_10%_0%,#f4edf9_0%,#faf7fd_45%,#ffffff_100%)] text-[#1f1827]">
        <div className="sm:px-5 sm:py-5 lg:px-8 lg:py-7">
          <PageHero hero={hero} heightClass="h-[44vh]" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-3 pb-14">


          <header className="relative rounded-3xl border mt-4 border-[#dacdea] bg-gradient-to-br from-[#5a3d72] via-[#6e4d87] to-[#7f5d99] p-6 text-[#f7f2fc] shadow-[0_30px_80px_-40px_rgba(49,31,64,0.8)] md:p-8">
            <p className="mb-3 inline-flex rounded-full border border-[#f1e8f8]/50 bg-[#f7f2fc]/10 px-3 py-1 text-xs font-semibold tracking-[0.12em] uppercase text-[#eadff4]">
              Appointment Flow
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Plan your perfect session</h1>
            <p className="mt-3 max-w-2xl text-sm text-[#eadff4]/92 md:text-base">
              Pick a location, choose your services, reserve your slot, and finish your booking in a polished flow.
            </p>
            {activeService && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#f1e8f8]/50 bg-[#f7f2fc]/10 px-4 py-2 text-xs text-[#f0e7f8]">
                <span className="font-semibold">Now booking:</span>
                <span>{activeService.name}</span>
              </div>
            )}
          </header>

          <div className="relative mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-6">
              <section className={`${panelClass} space-y-5`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6e4d87]/90">
                      Progress
                    </p>
                    <h2 className="text-lg font-semibold text-[#241a2f]">
                      Step {currentStepIndex + 1} of {steps.length}
                    </h2>
                  </div>
                  <span className="rounded-full bg-[#efe6f7] px-3 py-1 text-xs font-semibold text-[#5c3f73]">
                    {progressPercent}% complete
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#efe6f7]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#5c3f73] via-[#7f5d99] to-[#b996d0] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                  {steps.map((stepItem) => {
                    const isActive = step === stepItem.number;
                    const isCompleted = step > stepItem.number;
                    const StepIcon = stepItem.icon;

                    return (
                      <div
                        key={stepItem.number}
                        className={`rounded-2xl border px-3 py-3 text-xs transition ${
                          isActive
                            ? "border-[#6e4d87]/30 bg-[#efe6f7] text-[#5c3f73]"
                            : isCompleted
                            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                            : "border-[#e3d7ef] bg-white text-[#6f5e7f]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-full ${
                              isActive
                                ? "bg-[#5c3f73] text-white"
                                : isCompleted
                                ? "bg-emerald-500 text-white"
                                : "bg-[#efe6f7] text-[#6f5e7f]"
                            }`}
                          >
                            {isCompleted ? <Check className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                          </div>
                          <span className="font-semibold">{stepItem.title}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {apiError && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                  {apiError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 0: Select Location (when multiple branches) */}
        {step === 0 && branches.length > 1 && (
          <div className={`${panelClass} space-y-4`}>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-[#241a2f]">
              <MapPin className="h-5 w-5 text-[#5c3f73]" />
              Select Location
            </h3>
            <p className="text-sm text-[#5f4f70]">Choose the branch you want to visit.</p>
            {loadingBranches ? (
              <p className="text-sm text-[#7b6b8b]">Loading locations...</p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {branches.map((b) => {
                  const isSelected = selectedBranch?.id === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBranch(b)}
                      className={`${selectCardBase} ${
                        isSelected
                          ? "border-[#6e4d87]/45 bg-[#f1e8f8] shadow-[0_12px_28px_-20px_rgba(37,20,53,0.75)]"
                          : "border-[#e3d7ef] bg-white hover:border-[#d0bfdf]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-[#241a2f]">{b.name}</h4>
                          {b.address && <p className="mt-1 text-xs text-[#6f5e7f]">{b.address}</p>}
                        </div>
                        {isSelected && (
                          <div className="ml-2 flex-shrink-0">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5c3f73]">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Step 1: Select Services */}
        {step === 1 && (
          <div className={`${panelClass} space-y-4`}>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-[#241a2f]">
              <Check className="h-5 w-5 text-[#5c3f73]" />
              Select Services
            </h3>
            <p className="text-sm text-[#5f4f70]">You can select multiple services to book at once.</p>

            {loadingServices ? (
              <p className="text-sm text-[#7b6b8b]">Loading services...</p>
            ) : servicesFiltered.length === 0 ? (
              <p className="text-sm text-[#5f4f70]">No services available for this booking page.</p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {servicesFiltered.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceToggle(service.id)}
                      className={`${selectCardBase} ${
                        isSelected
                          ? "border-[#6e4d87]/45 bg-[#f1e8f8] shadow-[0_12px_28px_-20px_rgba(37,20,53,0.75)]"
                          : "border-[#e3d7ef] bg-white hover:border-[#d0bfdf]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-[#241a2f]">{service.name}</h4>
                          {service.description && (
                            <p className="mt-1 text-xs text-[#6f5e7f]">{service.description}</p>
                          )}
                          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#f2ecf8] px-3 py-1 text-xs font-medium text-[#5f4f70]">
                            <span>₦{service.price.toLocaleString()}</span>
                            <span className="text-[#9b8baa]">•</span>
                            <span>{service.duration} min</span>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="ml-2 flex-shrink-0">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5c3f73]">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {selectedServices.length > 0 && (
              <div className="mt-6 rounded-2xl border border-[#e2d4ef] bg-[#f5effa] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#241a2f]">
                      {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""} selected
                    </p>
                    <p className="mt-0.5 text-sm text-[#6f5e7f]">
                      {totalDuration} minutes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-[#5c3f73]">
                      ₦{totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Calendar & Time Selection */}
        {step === 2 && (
          <div className={`${panelClass} space-y-5`}>
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-[#241a2f]">
                <Calendar className="h-5 w-5 text-[#5c3f73]" />
                Choose Date & Time
              </h3>
              <p className="mt-1 text-sm text-[#5f4f70]">
                {selectedServices.length > 0 && (
                  <span>
                    Booking: <span className="font-medium">{services.find((s) => s.id === selectedServices[0])?.name}</span>
                    {selectedServices.length > 1 && (
                      <span className="text-[#7b6b8b]"> ({selectedServices.length} more to book)</span>
                    )}
                  </span>
                )}
              </p>
            </div>

            {/* Calendar */}
            <div className="space-y-4 rounded-2xl border border-[#e3d7ef] bg-[#faf7fd] p-4">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePreviousMonth}
                  className="rounded-xl border border-[#e3d7ef] bg-white p-2 text-[#5f4f70] transition hover:border-[#d0bfdf] hover:bg-[#faf7fd]"
                  disabled={loadingAvailability}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h4 className="font-semibold text-[#241a2f]">
                  {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h4>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="rounded-xl border border-[#e3d7ef] bg-white p-2 text-[#5f4f70] transition hover:border-[#d0bfdf] hover:bg-[#faf7fd]"
                  disabled={loadingAvailability}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              {loadingAvailability && (
                <p className="text-center text-xs text-[#7b6b8b]">Loading availability...</p>
              )}

              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-2 text-center text-xs font-semibold uppercase tracking-wide text-[#7b6b8b]">
                    {day}
                  </div>
                ))}
                {/* Generate all days of the month with proper day-of-week positioning */}
                {(() => {
                  const year = currentMonth.getFullYear();
                  const month = currentMonth.getMonth();
                  const firstDay = new Date(year, month, 1);
                  const lastDay = new Date(year, month + 1, 0);
                  const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
                  const daysInMonth = lastDay.getDate();
                  
                  // Create a map of date strings to availability
                  const availabilityMap = new Map(
                    availableDates.map(item => [item.date, item.available])
                  );
                  
                  // Get today's date string for comparison
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                  
                  const calendarCells = [];
                  
                  // Add empty cells for days before month starts
                  for (let i = 0; i < firstDayOfWeek; i++) {
                    calendarCells.push(
                      <div key={`empty-${i}`} className="p-2" />
                    );
                  }
                  
                  // Add cells for each day of the month
                  for (let day = 1; day <= daysInMonth; day++) {
                    const date = new Date(year, month, day);
                    date.setHours(0, 0, 0, 0);
                    
                    // Only show dates that are today or in the future
                    if (date >= today) {
                      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      const available = availabilityMap.get(dateStr) ?? false;
                      const isSelected = selectedDate === dateStr;
                      const isToday = dateStr === todayStr;

                      calendarCells.push(
                        <button
                          key={dateStr}
                          type="button"
                          onClick={() => {
                            if (available) {
                              setSelectedDate(dateStr);
                              // Clear selected time when date changes
                              setSelectedTime("");
                            }
                          }}
                          disabled={!available}
                          className={`rounded-xl border px-2 py-2 text-sm font-medium transition ${
                            isSelected
                              ? "border-[#5c3f73] bg-[#5c3f73] text-white shadow-[0_12px_24px_-16px_rgba(37,20,53,0.85)]"
                              : available
                              ? "border-[#e3d7ef] bg-white text-[#241a2f] hover:-translate-y-0.5 hover:border-[#cdb9de]"
                              : "cursor-not-allowed border-transparent bg-[#f2ecf8] text-[#9f90af]"
                          } ${isToday ? "ring-2 ring-[#b996d0] ring-offset-2" : ""}`}
                        >
                          {day}
                        </button>
                      );
                    } else {
                      // Past date - show empty cell
                      calendarCells.push(
                        <div key={`past-${day}`} className="p-2" />
                      );
                    }
                  }
                  
                  return calendarCells;
                })()}
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-[#5f4f70]">
                  <Clock className="mr-1 inline h-4 w-4" />
                  Select Time
                </label>
                {availableTimeSlots.length === 0 ? (
                  <p className="text-sm text-[#7b6b8b]">No available time slots for this date. Please select another date.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {availableTimeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                            isSelected
                              ? "border-[#5c3f73] bg-[#5c3f73] text-white shadow-[0_12px_24px_-16px_rgba(37,20,53,0.85)]"
                              : "border-[#e3d7ef] bg-white text-[#5f4f70] hover:border-[#d0bfdf] hover:bg-[#faf7fd]"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Select Staff */}
        {step === 3 && (
          <div className={`${panelClass} space-y-4`}>
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-[#241a2f]">
                <User className="h-5 w-5 text-[#5c3f73]" />
                Select Staff Member
              </h3>
              <p className="mt-1 text-sm text-[#5f4f70]">
                {selectedServices.length > 0 && selectedDate && selectedTime && (
                  <span>
                    For <span className="font-medium">{services.find((s) => s.id === selectedServices[0])?.name}</span> on{" "}
                    <span className="font-medium">
                      {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selectedTime}
                    </span>
                  </span>
                )}
              </p>
            </div>

            {(() => {
              // Get available staff from the availability slots for the selected date/time
              // This ensures we only show staff who are actually designated for this service
              let availableStaffForService: Array<{ id: string; name: string; designation: string }> = [];
              
              if (selectedDate && selectedTime && availableSlotsData[selectedDate]) {
                // Get staff from slots that match the selected time
                const slotsForTime = availableSlotsData[selectedDate].filter(slot => slot.time === selectedTime);
                // Create a map to get unique staff with their info
                const staffMap = new Map<string, { id: string; name: string; designation: string }>();
                
                slotsForTime.forEach(slot => {
                  if (!staffMap.has(slot.staffId)) {
                    // Find the full staff info from the staff list
                    const fullStaffInfo = staff.find(s => s.id === slot.staffId);
                    if (fullStaffInfo) {
                      staffMap.set(slot.staffId, {
                        id: slot.staffId,
                        name: slot.staffName || fullStaffInfo.name,
                        designation: fullStaffInfo.designation,
                      });
                    }
                  }
                });
                
                availableStaffForService = Array.from(staffMap.values());
              } else if (selectedDate && availableSlotsData[selectedDate]) {
                // If time not selected yet, show all staff available for this date
                const allSlotsForDate = availableSlotsData[selectedDate];
                const staffMap = new Map<string, { id: string; name: string; designation: string }>();
                
                allSlotsForDate.forEach(slot => {
                  if (!staffMap.has(slot.staffId)) {
                    const fullStaffInfo = staff.find(s => s.id === slot.staffId);
                    if (fullStaffInfo) {
                      staffMap.set(slot.staffId, {
                        id: slot.staffId,
                        name: slot.staffName || fullStaffInfo.name,
                        designation: fullStaffInfo.designation,
                      });
                    }
                  }
                });
                
                availableStaffForService = Array.from(staffMap.values());
              }
              if (schedulingPage?.staffIds?.length) {
                availableStaffForService = availableStaffForService.filter((m) =>
                  schedulingPage.staffIds.includes(m.id)
                );
              }
              
              if (loadingStaff) {
                return <p className="text-sm text-[#7b6b8b]">Loading staff...</p>;
              }
              
              if (availableStaffForService.length === 0) {
                if (!selectedDate || !selectedTime) {
                  return <p className="text-sm text-[#5f4f70]">Please select a date and time first to see available staff.</p>;
                }
                return <p className="text-sm text-[#5f4f70]">No staff available for this service at the selected time.</p>;
              }
              
              return (
                <div className="grid gap-3 md:grid-cols-2">
                  {availableStaffForService.map((member) => {
                    const isSelected = selectedStaff === member.id;
                    const initials = member.name
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((part) => part[0]?.toUpperCase())
                      .join("");
                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => setSelectedStaff(member.id)}
                        className={`${selectCardBase} ${
                          isSelected
                            ? "border-[#6e4d87]/45 bg-[#f1e8f8] shadow-[0_12px_28px_-20px_rgba(37,20,53,0.75)]"
                            : "border-[#e3d7ef] bg-white hover:border-[#d0bfdf]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#efe6f7] text-xs font-semibold text-[#5c3f73]">
                              {initials}
                            </div>
                            <div>
                              <h4 className="font-medium text-[#241a2f]">{member.name}</h4>
                              <p className="mt-1 text-sm text-[#6f5e7f]">{member.designation}</p>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="ml-2 flex-shrink-0">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5c3f73]">
                                <Check className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* Step 4: Information & Notes */}
        {step === 4 && (
          <div className={`${panelClass} space-y-4`}>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-[#241a2f]">
              <FileText className="h-5 w-5 text-[#5c3f73]" />
              Your Information
            </h3>

            {/* Review Sessions */}
            {sessions.length > 0 && (
              <div className="mb-6 space-y-3">
                <p className="text-sm font-medium text-[#5f4f70]">Booking Summary:</p>
                {sessions.map((session, index) => {
                  const service = services.find((s) => s.id === session.serviceId);
                  const staffMember = staff.find((s) => s.id === session.staffId);
                  return (
                    <div key={index} className="rounded-xl border border-[#e3d7ef] bg-white p-3">
                      <p className="text-sm font-medium text-[#241a2f]">{service?.name}</p>
                      <p className="text-xs text-[#6f5e7f]">
                        {staffMember?.name} · {new Date(session.date).toLocaleDateString()} at {session.time}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1 text-sm">
                <label className="block font-medium text-[#5f4f70]">
                  Full Name *
                  <input
                    required
                    className={inputClass}
                    value={form.clientName}
                    onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))}
                    placeholder="Full name"
                  />
                </label>
              </div>

              <div className="space-y-1 text-sm">
                <label className="block font-medium text-[#5f4f70]">
                  Email *
                  <input
                    required
                    type="email"
                    className={inputClass}
                    value={form.clientEmail}
                    onChange={(e) => setForm((f) => ({ ...f, clientEmail: e.target.value }))}
                    placeholder="Email address"
                  />
                </label>
              </div>

              <div className="space-y-1 text-sm md:col-span-2">
                <label className="block font-medium text-[#5f4f70]">
                  Phone Number *
                  <input
                    required
                    type="tel"
                    className={inputClass}
                    value={form.clientPhone}
                    onChange={(e) => setForm((f) => ({ ...f, clientPhone: e.target.value }))}
                    placeholder="Phone number"
                  />
                </label>
              </div>

              <div className="space-y-1 text-sm md:col-span-2">
                <label className="block font-medium text-[#5f4f70]">
                  Notes (optional)
                  <textarea
                    className={inputClass}
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    placeholder="Notes for your practitioner"
                  />
                </label>
              </div>
            </div>

            {/* Dynamic intake form fields */}
            {loadingBookingForm && (
              <p className="mt-4 text-sm text-[#7b6b8b]">Loading additional questions…</p>
            )}
            {!loadingBookingForm && bookingForm?.fields && bookingForm.fields.length > 0 && (
              <div className="mt-6 space-y-4 rounded-2xl border border-[#e3d7ef] bg-[#faf7fd] p-4">
                <p className="text-sm font-medium text-[#5f4f70]">{bookingForm.name}</p>
                {bookingForm.fields
                  .slice()
                  .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
                  .map((field) => (
                    <div key={field.id} className="space-y-1 text-sm">
                      <label className="block font-medium text-[#5f4f70]">
                        {field.label}
                        {field.required && " *"}
                      </label>
                      {field.type === "TEXT" && (
                        <input
                          className={inputClass}
                          value={(intakeValues[field.id] as string) ?? ""}
                          onChange={(e) => setIntakeValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
                          placeholder={field.placeholder ?? ""}
                          required={field.required}
                        />
                      )}
                      {field.type === "TEXTAREA" && (
                        <textarea
                          className={inputClass}
                          rows={3}
                          value={(intakeValues[field.id] as string) ?? ""}
                          onChange={(e) => setIntakeValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
                          placeholder={field.placeholder ?? ""}
                          required={field.required}
                        />
                      )}
                      {field.type === "NUMBER" && (
                        <input
                          type="number"
                          className={inputClass}
                          value={(intakeValues[field.id] as number) ?? ""}
                          onChange={(e) => setIntakeValues((prev) => ({ ...prev, [field.id]: e.target.value === "" ? "" : Number(e.target.value) }))}
                          placeholder={field.placeholder ?? ""}
                          required={field.required}
                        />
                      )}
                      {field.type === "DATE" && (
                        <input
                          type="date"
                          className={inputClass}
                          value={(intakeValues[field.id] as string) ?? ""}
                          onChange={(e) => setIntakeValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
                          required={field.required}
                        />
                      )}
                      {field.type === "CHECKBOX" && (
                        <label className="mt-2 flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={!!intakeValues[field.id]}
                            onChange={(e) => setIntakeValues((prev) => ({ ...prev, [field.id]: e.target.checked }))}
                          />
                          <span className="text-[#6f5e7f]">{field.placeholder || "Yes"}</span>
                        </label>
                      )}
                      {field.type === "RADIO" && (
                        <div className="mt-1 flex flex-wrap gap-3">
                          {(Array.isArray(field.options) ? field.options : []).map((opt: { value?: string; label?: string }, i: number) => (
                            <label key={i} className="inline-flex items-center gap-2 rounded-full border border-[#e3d7ef] bg-white px-3 py-1.5">
                              <input
                                type="radio"
                                name={field.id}
                                value={opt.value ?? opt.label ?? ""}
                                checked={(intakeValues[field.id] as string) === (opt.value ?? opt.label ?? "")}
                                onChange={() => setIntakeValues((prev) => ({ ...prev, [field.id]: opt.value ?? opt.label ?? "" }))}
                              />
                              <span className="text-[#5f4f70]">{opt.label ?? opt.value}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      {field.type === "SELECT" && (
                        <select
                          className={inputClass}
                          value={(intakeValues[field.id] as string) ?? ""}
                          onChange={(e) => setIntakeValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
                          required={field.required}
                        >
                          <option value="">Select…</option>
                          {(Array.isArray(field.options) ? field.options : []).map((opt: { value?: string; label?: string }, i: number) => (
                            <option key={i} value={opt.value ?? opt.label ?? ""}>{opt.label ?? opt.value}</option>
                          ))}
                        </select>
                      )}
                      {(field.type === "FILE" || field.type === "CONSENT" || field.type === "VIDEO" || field.type === "IMAGE") && (
                        <input
                          type="text"
                          className={inputClass}
                          value={(intakeValues[field.id] as string) ?? ""}
                          onChange={(e) => setIntakeValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
                          placeholder={field.type === "FILE" ? "Add notes if needed" : field.placeholder ?? ""}
                        />
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {message && (
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#e2d4ef] bg-[#f5effa] px-4 py-3">
            <p className="flex-1 text-sm text-[#5c3f73]">{message}</p>
            <button
              type="button"
              onClick={() => setMessage(null)}
              className="flex-shrink-0 rounded p-1 text-[#8e78a2] transition-colors hover:text-[#5c3f73]"
              aria-label="Close message"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3">
            <p className="text-sm text-rose-800">{error}</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className={`${panelClass} flex items-center justify-between gap-3`}>
          <button
            type="button"
            onClick={handleBack}
            disabled={step === (branches.length > 1 ? 0 : 1)}
            className="rounded-xl border border-[#d0bfdf] bg-white px-5 py-2.5 text-sm font-medium text-[#5f4f70] transition hover:border-[#b9a3cd] hover:bg-[#faf7fd] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-xl bg-[#5c3f73] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-[#4b335f]"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-[#5c3f73] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-[#4b335f] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Submitting…" : "Book Appointment" + (sessions.length > 1 ? "s" : "")}
            </button>
          )}
        </div>
      </form>
            </div>

            <aside className="space-y-4">
              <section className={`${panelClass} space-y-3`}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6e4d87]/90">Booking Snapshot</h3>
                <div className="space-y-2 text-sm text-[#5f4f70]">
                  <div className="flex items-center justify-between rounded-xl bg-[#f5effa] px-3 py-2">
                    <span>Services selected</span>
                    <span className="font-semibold text-[#241a2f]">{selectedServices.length}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-[#f5effa] px-3 py-2">
                    <span>Sessions added</span>
                    <span className="font-semibold text-[#241a2f]">{sessions.length}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-[#f5effa] px-3 py-2">
                    <span>Total selected value</span>
                    <span className="font-semibold text-[#5c3f73]">₦{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </section>

              {sessions.length > 0 && (
                <section className={`${panelClass} space-y-3`}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6e4d87]/90">
                    Confirmed In This Flow
                  </h3>
                  <div className="space-y-2">
                    {sessions.map((session, index) => {
                      const service = services.find((s) => s.id === session.serviceId);
                      const staffMember = staff.find((s) => s.id === session.staffId);

                      return (
                        <div key={index} className="rounded-xl border border-[#e3d7ef] bg-white p-3">
                          <p className="text-sm font-semibold text-[#241a2f]">{service?.name}</p>
                          <p className="mt-1 text-xs text-[#6f5e7f]">
                            {staffMember?.name} ·{" "}
                            {new Date(session.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            at {session.time}
                          </p>
                          {session.resourceName && (
                            <p className="mt-1 text-xs text-[#7b6b8b]">Room: {session.resourceName}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export function BookingsPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-4">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    }>
      <AppointmentsContent />
    </Suspense>
  );
}
