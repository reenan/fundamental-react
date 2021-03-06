import { Calendar } from '../Calendar/Calendar';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: true,
            selectedDate: '',
            arrSelectedDates: [],
            formattedDate: ''
        };
    }

    openCalendar = type => {
        if (type === 'input') {
            if (this.state.hidden) {
                this.setState({ hidden: !this.state.hidden });
            }
        } else {
            this.setState({ hidden: !this.state.hidden });
        }
    };

    modifyDate = (e) => {
        this.setState({ formattedDate: e.target.value });
    }

    //This is being used only when the user presses enter or clicks outside of the component
    formatDate = (date) => {
        let formatDate = '';
        if (this.props.enableRangeSelection) {
            if (date.length === 0) {
                return '';
            }

            let firstDateMonth = date[0].getMonth() + 1;
            let firstDateDay = date[0].getDate();
            let firstDateYear = date[0].getFullYear();

            let secondDateMonth = date[1].getMonth() + 1;
            let secondDateDay = date[1].getDate();
            let secondDateYear = date[1].getFullYear();

            if (firstDateYear >= 3000 || secondDateYear >= 3000) {
                return '';
            }
            formatDate =
                firstDateMonth +
                '/' +
                firstDateDay +
                '/' +
                firstDateYear +
                '-' +
                secondDateMonth +
                '/' +
                secondDateDay +
                '/' +
                secondDateYear;
        }
        return formatDate;
    }

    sendUpdate = (e) => {
        if (e.key === 'Enter') {
            this.validateDates();
        }
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.click, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.click, false);
    }

    click = e => {
        if (this.component.contains(e.target)) {
            return;
        }
        this.clickOutside();
    };

    validateDates = () => {
        let regex = /[!$%^&*()_+|~=`{}\[\]:'<>?,.\a-zA-Z]/;
        //Checks first if range is enabled
        if (this.props.enableRangeSelection) {
            //If the formattedDate contains a list of special characters symbols then it will be reset
            if (
                this.state.formattedDate.search(regex) !== -1 ||
                this.state.formattedDate === '' ||
                this.state.formattedDate.split('-').length < 2
            ) {
                this.setState({
                    formattedDate: '',
                    arrSelectedDates: 'undefined',
                    hidden: false
                });
            } else {
                //Breaks the input into an array
                let dateRange = this.state.formattedDate.split('-');
                let dateSeparatedFirstRange = dateRange[0].split('/');
                let dateSeparatedSecondRange = dateRange[1].split('/');

                //First date
                let firstYearRange = parseInt(dateSeparatedFirstRange[2], 10);
                let firstDateRange = parseInt(dateSeparatedFirstRange[1], 10);
                let firstMonthRange = parseInt(dateSeparatedFirstRange[0], 10);

                //Second date
                let secondYearRange = parseInt(dateSeparatedSecondRange[2], 10);
                let secondDateRange = parseInt(dateSeparatedSecondRange[1], 10);
                let secondMonthRange = parseInt(dateSeparatedSecondRange[0], 10);

                //Checks if the input is actually numbers and follows the required form
                if ((1 <= firstDateRange && firstDateRange <= 31) &&
                    (1 <= firstMonthRange && firstMonthRange <= 12) &&
                    firstYearRange <= 3000 &&
                    (1 <= secondDateRange && secondDateRange <= 31) &&
                    (1 <= secondMonthRange && secondMonthRange <= 12) &&
                    secondYearRange <= 3000
                ) {
                    let firstDate = new Date(
                        firstYearRange,
                        firstMonthRange - 1,
                        firstDateRange
                    );
                    let secondDate = new Date(
                        secondYearRange,
                        secondMonthRange - 1,
                        secondDateRange
                    );
                    let arrSelected = [];
                    //Swaps the order in case one date is bigger than the other
                    firstDate.getTime() > secondDate.getTime()
                        ? (arrSelected = [secondDate, firstDate])
                        : (arrSelected = [firstDate, secondDate]);

                    this.setState({
                        selectedDate: '',
                        arrSelectedDates: arrSelected
                    });
                } else {
                    this.setState({
                        formattedDate: '',
                        selectedDate: 'undefined',
                        arrSelectedDates: 'undefined'
                    });
                }
            }
        } else {
            if (this.state.formattedDate.search(regex) !== -1) {
                this.setState({
                    formattedDate: this.formatDate(this.state.selectedDate),
                    selectedDate: 'undefined'
                });
            } else {
                let dateSeparated = this.state.formattedDate.split('/');
                let year = parseInt(dateSeparated[2], 10);
                let date = parseInt(dateSeparated[1], 10);
                let month = parseInt(dateSeparated[0], 10);

                if ((1 <= date && date <= 31) &&
                    (1 <= month && month <= 12) &&
                    year <= 3000
                ) {
                    this.setState({
                        selectedDate: new Date(year, month - 1, date)
                    });
                } else {
                    this.setState({
                        selectedDate: 'undefined',
                        formattedDate: ''
                    });
                }
            }
        }
    }

    clickOutside = () => {
        this.validateDates();
        this.setState({ hidden: true });
    };

    updateDate = (date) => {
        // console.log('Inside updateDate function. The event is: ', date);

        if (this.props.enableRangeSelection) {
            if (date.length === 2) {
                let firstDateMonth = date[0].getMonth() + 1;
                let firstDateDay = date[0].getDate();
                let firstDateYear = date[0].getFullYear();

                let secondDateMonth = date[1].getMonth() + 1;
                let secondDateDay = date[1].getDate();
                let secondDateYear = date[1].getFullYear();

                let formatDate =
                    firstDateMonth +
                    '/' +
                    firstDateDay +
                    '/' +
                    firstDateYear +
                    '-' +
                    secondDateMonth +
                    '/' +
                    secondDateDay +
                    '/' +
                    secondDateYear;
                this.setState({
                    arrSelectedDates: date,
                    formattedDate: formatDate
                });
            } else {
                let firstDateMonth = date[0].getMonth() + 1;
                let firstDateDay = date[0].getDate();
                let firstDateYear = date[0].getFullYear();

                let formatDate =
                    firstDateMonth + '/' + firstDateDay + '/' + firstDateYear;

                this.setState({
                    arrSelectedDates: date,
                    formattedDate: formatDate
                });
            }
        } else {
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let year = date.getFullYear();

            let formatDate = month + '/' + day + '/' + year;

            this.setState({
                selectedDate: date,
                formattedDate: formatDate
            });
        }
    }

    render() {
        const { enableRangeSelection, disableWeekends, disableBeforeDate, disableAfterDate,
            disableWeekday, disablePastDates, disableFutureDates, blockedDates, disabledDates,
            compact, className, inputProps, buttonProps, ...props } = this.props;

        const datePickerClasses = classnames(
            'fd-date-picker',
            className
        );

        const datePickerInputGroupClasses = classnames(
            'fd-input-group',
            'fd-input-group--after',
            {
                'fd-input-group--compact': compact
            }
        );

        const datePickerInputClasses = classnames(
            'fd-input',
            {
                'fd-input--compact': compact
            }
        );

        return (
            <div
                {...props}
                className={datePickerClasses}
                ref={component => (this.component = component)}>
                <div className='fd-popover'>
                    <div className='fd-popover__control'>
                        <div
                            className={datePickerInputGroupClasses}>
                            <input
                                {...inputProps}
                                className={datePickerInputClasses}
                                onChange={this.modifyDate}
                                onClick={() => this.openCalendar('input')}
                                onKeyPress={this.sendUpdate}
                                placeholder='mm/dd/yyyy'
                                type='text'
                                value={this.state.formattedDate} />
                            <span className='fd-input-group__addon fd-input-group__addon--after fd-input-group__addon--button'>
                                <button {...buttonProps}
                                    className='fd-popover__control fd-button--light sap-icon--calendar'
                                    onClick={() => this.openCalendar()} />
                            </span>
                        </div>
                    </div>
                    <div
                        aria-hidden={this.state.hidden}
                        className='fd-popover__body fd-popover__body--right fd-popover__body--no-arrow'>
                        <Calendar
                            blockedDates={blockedDates}
                            customDate={
                                enableRangeSelection
                                    ? this.state.arrSelectedDates
                                    : this.state.selectedDate
                            }
                            disableAfterDate={disableAfterDate}
                            disableBeforeDate={disableBeforeDate}
                            disableFutureDates={disableFutureDates}
                            disablePastDates={disablePastDates}
                            disableWeekday={disableWeekday}
                            disableWeekends={disableWeekends}
                            disabledDates={disabledDates}
                            enableRangeSelection={enableRangeSelection}
                            onChange={this.updateDate} />
                    </div>
                </div>
            </div>
        );
    }
}

DatePicker.propTypes = {
    ...Calendar.basePropTypes,
    buttonProps: PropTypes.object,
    compact: PropTypes.bool,
    enableRangeSelection: PropTypes.bool,
    inputProps: PropTypes.object
};

DatePicker.propDescriptions = {
    ...Calendar.propDescriptions,
    enableRangeSelection: 'Set to **true** to enable the selection of a date range (begin and end).'
};
