'use strict';

var React = require('react'),
  createClass = require('create-react-class'),
  moment = require('moment'),
  onClickOutside = require('react-onclickoutside');

var DOM = React.DOM;
var DateTimePickerDays = onClickOutside(createClass({
  render: function () {
    var footer = this.renderFooter(),
      date = this.props.viewDate,
      locale = date.localeData(),
      tableChildren;

    tableChildren = [
      DOM.thead({ key: 'th' }, [
        DOM.tr({ key: 'h' }, [
          DOM.th({ key: 'p', className: 'rdtPrev', onClick: this.props.subtractTime(1, 'months')}, DOM.span({}, '‹')),
          DOM.th({ key: 's', className: 'rdtSwitch', onClick: this.props.showView('months'), colSpan: 5, 'data-value': this.props.viewDate.month() }, locale.months(date) + ' ' + date.year()),
          DOM.th({ key: 'n', className: 'rdtNext', onClick: this.props.addTime(1, 'months')}, DOM.span({}, '›'))
        ]),
        DOM.tr({ key: 'd'}, this.getDaysOfWeek(locale).map(function (day, index) { return DOM.th({ key: day + index, className: 'dow'}, day); }))
      ]),
      DOM.tbody({ key: 'tb' }, this.renderDays())
    ];

    if (footer) {
      tableChildren.push(footer);
    }

    return DOM.div({ className: 'rdtDays' },
			DOM.table({}, tableChildren)
		);
  },

	/**
	 * Get a list of the days of the week
	 * depending on the current locale
	 * @return {array} A list with the shortname of the days
	 */
  getDaysOfWeek: function (locale) {
    var days = locale._weekdaysMin,
      first = locale.firstDayOfWeek(),
      dow = [],
      i = 0;

    days.forEach(function (day) {
      dow[ (7 + (i++) - first) % 7 ] = day;
    });

    return dow;
  },

  renderDays: function () {
    var date = this.props.viewDate,
      selected = this.props.selectedDate && this.props.selectedDate.clone(),
      prevMonth = date.clone().subtract(1, 'months'),
      currentYear = date.year(),
      currentMonth = date.month(),
      weeks = [],
      days = [],
      renderer = this.props.renderDay || this.renderDay,
      isValid = this.props.isValidDate || this.alwaysValidDate,
      classes, isDisabled, dayProps, currentDate;

		// Go to the last week of the previous month
    prevMonth.date(prevMonth.daysInMonth()).startOf('week');
    var lastDay = date.endOf('month');

    while (prevMonth.isBefore(lastDay)) {
      classes = 'rdtDay';
      currentDate = prevMonth.clone();

      if ((prevMonth.year() === currentYear && prevMonth.month() < currentMonth) || (prevMonth.year() < currentYear)) {
        classes += ' rdtOld';
      } else if ((prevMonth.year() === currentYear && prevMonth.month() > currentMonth) || (prevMonth.year() > currentYear)) {
        classes += ' rdtNew';
      }

      if (selected && prevMonth.isSame(selected, 'day')) {
        classes += ' rdtActive';
      }

      if (prevMonth.isSame(moment(), 'day')) {
        classes += ' rdtToday';
      }

      isDisabled = !isValid(currentDate, selected);
      if (isDisabled) {
        classes += ' rdtDisabled';
      }

      dayProps = {
        key: prevMonth.format('M_D'),
        'data-value': prevMonth.date(),
        className: classes
      };

      if (!isDisabled) {
        dayProps.onClick = this.updateSelectedDate;
      }

      days.push(renderer(dayProps, currentDate, selected));

      if (days.length === 7 || currentDate.isSame(lastDay, 'day')) {
        if (currentDate.month() === date.month()) {
          weeks.push(DOM.tr({ key: prevMonth.format('M_D')}, days));
        }
        days = [];
      }

      prevMonth.add(1, 'd');
    }

    return weeks;
  },

  updateSelectedDate: function (event) {
    this.props.updateSelectedDate(event, true);
  },

  renderDay: function (props, currentDate) {
    return DOM.td(props, currentDate.date());
  },

  renderFooter: function () {
    if (!this.props.timeFormat) { return ''; }

    var date = this.props.selectedDate || this.props.viewDate;

    return DOM.tfoot({ key: 'tf'},
			DOM.tr({},
				DOM.td({ onClick: this.props.showView('time'), colSpan: 7, className: 'rdtTimeToggle' }, date.format(this.props.timeFormat))
			)
		);
  },

  alwaysValidDate: function () {
    return 1;
  },

  handleClickOutside: function () {
    this.props.handleClickOutside();
  }
}));

module.exports = DateTimePickerDays;
