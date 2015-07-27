var store = {
  occupation_fields: {
    start_date: {
      original: "Sat, 01 Jan 2011",
      override: "2011-02-01",
      name: "Start Date",
      status: "overriden",
      input_type: "date_picker",
    },
    end_date: {
      original: "Mon, 31 Dec 2012",
      override: "2012-05-31",
      name: "End Date",
      status: "overriden",
      input_type: "date_picker"
    }
  },
  occupationable_general_fields: {
    job_title: {
      original: "Executive IT Consultant",
      override: "Sales Intern",
      name: "Job Title",
      status: "overriden",
      input_type: "text_field"
    },
    reason_leaving: {
      original: "I moved to a new city",
      override: null,
      name: "Reason Leaving",
      status: "no_override",
      input_type: "text_field"
    }
  },
  long_text_fields: {
    additional_info: {
      original: null,
      override: null,
      name: "Additional Info",
      status: "no_override",
      input_type: "text_field"
    }
  },
  occupationable_referee_fields: {
    contact_first_name: {
      original: "Kendall",
      override: "Jamie",
      name: "Name",
      status: "overriden",
      input_type: "text_field"
    },
    line_email: {
      original: "juanita@hahn.biz",
      override: null,
      name: "Email",
      status: "no_override",
      input_type: "text_field"
    },
    contact_job_title: {
      original: "Sales Consultant",
      override: null,
      name: "Job Title",
      status: "no_override",
      input_type: "text_field"
    },
    line_telephone: {
      original: "02023630155",
      override: null,
      name: "Phone",
      status: "no_override",
      input_type: "text_field"
    }
  }
};

var storeNoOverrides = {
  occupation_fields: {
    start_date: {
      original: "Sat, 01 Jan 2011",
      override: null,
      name: "Start Date",
      status: "overriden",
      input_type: "date_picker",
    },
    end_date: {
      original: "Mon, 31 Dec 2012",
      override: null,
      name: "End Date",
      status: "overriden",
      input_type: "date_picker"
    }
  },
  occupationable_general_fields: {
    job_title: {
      original: "Executive IT Consultant",
      override: null,
      name: "Job Title",
      status: "overriden",
      input_type: "text_field"
    },
    reason_leaving: {
      original: "I moved to a new city",
      override: null,
      name: "Reason Leaving",
      status: "no_override",
      input_type: "text_field"
    }
  },
  long_text_fields: {
    additional_info: {
      original: null,
      override: null,
      name: "Additional Info",
      status: "no_override",
      input_type: "text_field"
    }
  },
  occupationable_referee_fields: {
    contact_first_name: {
      original: "Kendall",
      override: null,
      name: "Name",
      status: "overriden",
      input_type: "text_field"
    },
    line_email: {
      original: "juanita@hahn.biz",
      override: null,
      name: "Email",
      status: "no_override",
      input_type: "text_field"
    },
    contact_job_title: {
      original: "Sales Consultant",
      override: null,
      name: "Job Title",
      status: "no_override",
      input_type: "text_field"
    },
    line_telephone: {
      original: "02023630155",
      override: null,
      name: "Phone",
      status: "no_override",
      input_type: "text_field"
    }
  }
};

var flags = {
  show_referee: true
};

var takeAction = function() {};

module.exports = {
  store: store,
  storeNoOverrides: storeNoOverrides,
  flags: flags,
  takeAction: takeAction
};
