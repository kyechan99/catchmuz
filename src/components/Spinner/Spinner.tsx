import './Spinner.scss';

type SpinnerProps = {
    className? : string
}

export const Spinner = ({ className } : SpinnerProps) => {
    return (
        <div className={`spinner ${className}`}>
        </div>
    );
}

export const SpinnerSM = () => {
    return (
        <Spinner className={'spinner-sm'}></Spinner>
    );
}

export const SpinnerMD = () => {
    return (
        <Spinner className={'spinner-md'}></Spinner>
    );
}

export const SpinnerLG = () => {
    return (
        <Spinner className={'spinner-lg'}></Spinner>
    );
}

export const SpinnerXL = () => {
    return (
        <Spinner className={'spinner-xl'}></Spinner>
    );
}
