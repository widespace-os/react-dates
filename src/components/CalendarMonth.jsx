import React, { PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import cx from 'classnames';

import CalendarDay from './CalendarDay';

import getCalendarMonthWeeks from '../utils/getCalendarMonthWeeks';

import OrientationShape from '../shapes/OrientationShape';

import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from '../../constants';

const propTypes = {
  month: momentPropTypes.momentObj,
  isVisible: PropTypes.bool,
  enableOutsideDays: PropTypes.bool,
  modifiers: PropTypes.object,
  orientation: OrientationShape,
  daySize: PropTypes.number,
  onDayClick: PropTypes.func,
  onDayMouseDown: PropTypes.func,
  onDayMouseUp: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  onDayTouchStart: PropTypes.func,
  onDayTouchEnd: PropTypes.func,
  onDayTouchTap: PropTypes.func,

  // i18n
  monthFormat: PropTypes.string,
};

const defaultProps = {
  month: moment(),
  isVisible: true,
  enableOutsideDays: false,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  daySize: 39,
  onDayClick() {},
  onDayMouseDown() {},
  onDayMouseUp() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  onDayTouchStart() {},
  onDayTouchEnd() {},
  onDayTouchTap() {},

  // i18n
  monthFormat: 'MMMM YYYY', // english locale
};

export function getModifiersForDay(modifiers, day) {
  return day ? Object.keys(modifiers).filter(key => modifiers[key](day)) : [];
}

export default function CalendarMonth(props) {
  const {
    month,
    monthFormat,
    orientation,
    isVisible,
    modifiers,
    enableOutsideDays,
    daySize,
    onDayClick,
    onDayMouseDown,
    onDayMouseUp,
    onDayMouseEnter,
    onDayMouseLeave,
    onDayTouchStart,
    onDayTouchEnd,
    onDayTouchTap,
  } = props;
  const monthTitle = month.format(monthFormat);

  const calendarMonthClasses = cx('CalendarMonth', {
    'CalendarMonth--horizontal': orientation === HORIZONTAL_ORIENTATION,
    'CalendarMonth--vertical': orientation === VERTICAL_ORIENTATION,
  });

  return (
    <div className={calendarMonthClasses} data-visible={isVisible}>
      <table>
        <caption className="CalendarMonth__caption js-CalendarMonth__caption">
          <strong>{monthTitle}</strong>
        </caption>

        <tbody className="js-CalendarMonth__grid">
          {getCalendarMonthWeeks(month, enableOutsideDays).map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => {
                const modifiersForDay = getModifiersForDay(modifiers, day);
                const className = cx('CalendarMonth__day', {
                  'CalendarMonth__day--outside': !day || day.month() !== month.month(),
                }, modifiersForDay.map(mod => `CalendarMonth__day--${mod}`));

                const daySizeStyles = {
                  width: daySize,
                  height: daySize - 1,
                };

                return (
                  <td className={className} key={j} style={daySizeStyles}>
                    {day &&
                      <CalendarDay
                        day={day}
                        modifiers={modifiersForDay}
                        onDayMouseEnter={onDayMouseEnter}
                        onDayMouseLeave={onDayMouseLeave}
                        onDayMouseDown={onDayMouseDown}
                        onDayMouseUp={onDayMouseUp}
                        onDayClick={onDayClick}
                        onDayTouchStart={onDayTouchStart}
                        onDayTouchEnd={onDayTouchEnd}
                        onDayTouchTap={onDayTouchTap}
                      />
                    }
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

CalendarMonth.propTypes = propTypes;
CalendarMonth.defaultProps = defaultProps;
