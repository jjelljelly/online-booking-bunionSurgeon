
import { usePatientContext } from '@/app/context/patientContext'
import style from './Completion.module.css'

export function Completion() {
    const patientData = usePatientContext()

    return (
        <>
            <div className={style.container}>
                <h2>Thank you {patientData?.patientData?.firstName} {patientData?.patientData?.lastName}</h2>
                <div className={style.text}>
                    <p>Your appointment has been scheduled</p>
                    <p>A confirmation email will be sent shortly with full details</p>
                    <p>If you have any questions please do not hesitate to contact us</p>
                    <a href="tel:+442074594326">
                        <p>Tel: +44207 459 4326</p>
                    </a>
                    <a href="mailto:admin@bunionsurgeon.co.uk">
                        <p>Email: admin@bunionsurgeon.co.uk</p>
                    </a>
                </div>
            </div>
        </>
    )
}