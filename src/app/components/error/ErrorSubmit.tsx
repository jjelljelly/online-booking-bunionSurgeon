import style from './Error.module.css'
import { STEPS_NAMES } from '@/app/context/stepsContext'
import { HeaderSection } from '../templates/HeaderSection'

export function ErrorSubmit() {

    return (
        <>
            <HeaderSection stepUpdate={STEPS_NAMES.STEP_1_1} headerText={'Error Arranging Appointment'} />
            <div className={style.errorDiv}>
                <div className={style.update}>
                    <p>Unfortunately we have experienced an error whilst booking your appointment.</p>
                    <p>Please either try arranging a time again or contact our team for assistance</p>
                    <a href="tel:+442074594326">
                        <p>Tel: +44 207 459 4326</p>
                    </a>
                    <a href="mailto:admin@bunionsurgeon.co.uk">
                        <p>Email: admin@bunionsurgeon.co.uk</p>
                    </a>
                </div>
            </div>
        </>
    )
}