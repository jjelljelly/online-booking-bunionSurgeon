import { useDataContext } from '@/app/context/dataContext';
import { useStepsContext, STEPS_NAMES } from '@/app/context/stepsContext';
import React, { useState } from 'react'
import style from './Calendar.module.css'
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import { SPECIALIST } from "./AppointmentSelectFunction";
import { usePatientContext } from '@/app/context/patientContext';
import { fetchFuConfirmationResponse } from '../functions/fetchFuConfirmationResponse';
import { Loading } from '../Loading';

type SlotProps = PickersDayProps<Dayjs> & { availableDates?: string[] }

function ServerDay(props: SlotProps) {

    const { availableDates = [], day, outsideCurrentMonth, ...other } = props;
    const isHighLighted = !outsideCurrentMonth && availableDates.some(availableDate => day.isSame(dayjs(availableDate), "day"))
    const isFirst = day.isSame(dayjs(availableDates[0]), "day")
    return (
        <Badge
            key={day.toString()}
            overlap="circular"
        >
            <PickersDay
                sx={{
                    backgroundColor: isFirst ? "rgba(21, 101, 192, .6)" : isHighLighted ? "rgba(21, 101, 192, .4)" : "white",
                    border: 'none'
                }}
                outsideCurrentMonth={outsideCurrentMonth}
                day={day}
                {...other}
            />
        </Badge>
    );
}

export const DATE_FORMAT = "DD-MM-YYYY";
export function Calendar() {

    const value = useStepsContext()
    const info = useDataContext()
    const patientData = usePatientContext()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    let diaryType: string[] = []

    if (patientData?.patientData?.appointment?.hasSpecialist(SPECIALIST.K_NAZIR)) {
        if (patientData?.patientData?.appointment.nurseRequired) {
            diaryType = info?.data?.kaserWithNurseAvailableDates ?? []
        } else {
            diaryType = info?.data?.kaserFinalAvailableDates ?? []
        }
    } else if (patientData?.patientData?.appointment?.hasSpecialist(SPECIALIST.S_THOMAS) || patientData?.patientData?.appointment?.hasSpecialist(SPECIALIST.S_THOMAS_KN)) {
        if (patientData?.patientData.appointment.nurseRequired) {
            if (patientData?.patientData.appointment.appointmentLength === 20) {
                diaryType = info?.data?.stevenWithNurseAvailableDates20 ?? []
            } else if (patientData?.patientData.appointment.appointmentLength === 40) {
                diaryType = info?.data?.stevenWithNurseAvailableDates40 ?? []
            } else if (patientData?.patientData.appointment.appointmentLength === 60) {
                diaryType = info?.data?.stevenWithNurseAvailableDates60 ?? []
            }
        } else if (patientData?.patientData.appointment.appointmentLength === 20) {
            diaryType = info?.data?.stevenFinalAvailableDates20 ?? []
        } else if (patientData?.patientData.appointment.appointmentLength === 40) {
            diaryType = info?.data?.stevenFinalAvailableDates40 ?? []
        } else if (patientData?.patientData.appointment.appointmentLength === 60) {
            diaryType = info?.data?.stevenFinalAvailableDates60 ?? []
        }
    } else if (patientData?.patientData?.appointment?.hasSpecialist(SPECIALIST.K_NAZIR_THEN_ST)) {
        diaryType = info?.data?.kaserThenStevenAvailableDates ?? []
    }
    const [appointmentDate, setAppointmentDate] = useState<dayjs.Dayjs>()

    const handleSubmit = async (currDate: string) => {
        if (patientData?.patientData?.appointment?.isNewPatient) {
            patientData?.setPatientData({ selectedDate: currDate })
            value?.setStep(STEPS_NAMES.STEP_3_1)
        } else {
            setIsLoading(true)
            const submitBooking = await fetchFuConfirmationResponse(patientData, currDate)
            if (submitBooking.outcome === "Successful") {
                setIsLoading(false)
                value?.setStep(STEPS_NAMES.STEP_3_2)
            } else {
                value?.setStep(STEPS_NAMES.ERROR_SUBMIT)
            }

        }

    }
    return (
        <div className={style.layout}>
            <div className={style.calendar}>
                <DateCalendar
                    defaultValue={dayjs(diaryType[0])}
                    onChange={(newValue) => setAppointmentDate(dayjs(newValue))}
                    shouldDisableDate={(calDate: dayjs.Dayjs) => {
                        return !diaryType.some((availableDate: string) => {
                            const aDate = dayjs(availableDate)
                            return aDate.isSame(dayjs(calDate), 'date')
                        })
                    }}
                    slots={{
                        day: ServerDay,
                    }}
                    slotProps={{
                        day: {
                            availableDates: diaryType,
                        } as SlotProps,
                    }}
                    sx={{
                        "& .Mui-selected": {
                            backgroundColor: "rgba(225, 231, 242, .4)"
                        }
                    }}
                    disableHighlightToday
                />
                <div
                    className={style.timesDiv}
                >
                    {
                        diaryType.reduce((accumulator: React.ReactNode[], currDate: string) => {
                            if (dayjs(appointmentDate)?.isSame(dayjs(currDate), "day")) {
                                accumulator.push(
                                    <MenuItem className={style.menuDate} key={currDate} onClick={() => handleSubmit(currDate)}>
                                        {currDate.split(' ')[4].slice(0, 5)}
                                    </MenuItem>
                                )

                            }
                            return accumulator
                        }, [])
                    }
                </div>
            </div >
            <Loading isLoading={isLoading} />
        </div >
    )
}
