import { useState, useEffect } from "react"
import classes from "../../data/classes";

// small helpers at module scope so hooks don't require them as deps
function pad(n) { return n.toString().padStart(2, '0'); }

// format as 12-hour hh:mm and return {time12, ampm}
function formatTime12FromDate(d) {
    const h = d.getHours();
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = ((h + 11) % 12) + 1; // converts 0->12, 13->1, etc
    return { time12: `${pad(hour12)}:${pad(d.getMinutes())}`, ampm };
}

const Timer = () => {

    // this will be the state for timer (string like "hh:mm") stored in 12-hour format
    const [time, setTime] = useState(() => formatTime12FromDate(new Date()).time12);
    // AM / PM state
    const [ampm, setAmPm] = useState(() => formatTime12FromDate(new Date()).ampm);

    // Live updater: update every second and keep 12-hour format
    useEffect(() => {
        const id = setInterval(() => {
            const now = new Date();
            const f = formatTime12FromDate(now);
            setTime(f.time12);
            setAmPm(f.ampm);
        }, 1000);
        return () => clearInterval(id);
    }, []);

    // dropdown state for classes
    const [selectedClass, setSelectedClass] = useState("");

    const handleClassChange = (e) => setSelectedClass(e.target.value);

    return (
        <>
            <div className="bg-[#DBA069] w-[685px] h-[60px] flex items-center justify-start gap-3 px-4 rounded-[25px]">
                {/* split time into hour and minute bubbles */}
                {(() => {
                    const [hh, mm] = time.split(":");
                    return (
                        <div className="flex items-center space-x-3">
                            <div className="bg-[#F8E1CB] px-3 py-1 rounded-[25px] w-[100px] h-[#30px] text-[#4C2F1A]">
                                <p className="m-0">{hh}</p>
                            </div>

                            {/* vertical colon made of two stacked dots */}
                            <div className="flex flex-col items-center justify-center mx-1 space-y-1 -ml-2">
                                <div className="w-2 h-2 rounded-full bg-[#F8E1CB]"></div>
                                <div className="w-2 h-2 rounded-full bg-[#F8E1CB]"></div>
                            </div>

                            <div className="bg-[#F8E1CB] px-3 py-1 rounded-[25px] w-[100px] h-[#30px] text-[#4C2F1A]">
                                <p className="m-0">{mm}</p>
                            </div>
                        </div>
                    );
                })()}

                    {/* AM/PM stacked badges (moved flush to time group) */}
                    <div className="flex flex-col items-center justify-center">
                    <div className={`${ampm === 'AM' ? 'bg-[#F8E1CB] text-gray-800' : 'bg-[#F8E1CB] text-[#4C2F1A]'} px-3 py-1 rounded-t-[10px] w-[30px] h-[20px] text-[12px] flex items-center justify-center`}>AM</div>
                    <div className={`${ampm === 'PM' ? 'bg-[#A67A4D] text-white' : 'bg-[#D1E8FF] text-gray-800'} px-3 py-1 rounded-b-[10px] w-[30px] h-[20px] text-[12px] flex items-center justify-center`}>PM</div>
                </div>
                
                {/* class dropdown */}
                <div>
                    <label className="sr-only">Select class</label>
                    <div className="relative inline-block">
                        <select value={selectedClass} onChange={handleClassChange} className="appearance-none bg-[#F8E1CB] text-[#A67A4D] text-[16px] rounded-full h-[30px] w-full border-none text-center leading-[30px] pr-3 focus:outline-none focus:ring-0">
                            <option value="">class... </option>
                            {Object.keys(classes).map((dept) => (
                                <optgroup key={dept} label={dept}>
                                    {classes[dept].map((num) => (
                                        <option key={dept + num} value={`${dept} ${num}`}>{dept} {num}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                        {/* simple arrow */}
                        <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A67A4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    </div>

            </div>


            </div>

            
        </>
    )
}

export default Timer