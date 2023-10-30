import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import Link from 'next/link';

let theme = createTheme();
theme = responsiveFontSizes(theme);
const styles = {
  root: {
    marginTop: '24px',
    marginBottom: '24px',
  },
  title: {
    marginBottom: '24px',
  },
  sectionTitle: {
    marginTop: '32px',
    marginBottom: '16px',
  },
  sectionContent: {
    marginBottom: '16px',
  },
  sectionBody: {
    marginBottom: '10px',
  },
  listBody: {
    marginBottom: '5px',
  },
  listItem: {
    paddingLeft: 0,
    marginBottom: '1px',
    // display: 'flex',
    // alignItems: 'flex-start',
    Color: 'black',
  },
  dot: {
    borderRadius: '50%',
    width: '6px',
    height: '6px',
    margin: '6px 8px 6px 8px',
    backgroundColor: 'black',
    minWidth: 'auto',
    marginRight: 8,
  },
};

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" style={styles.root}>
      <Typography
        variant="h2"
        align="center"
        component="h3"
        style={styles.title}
        color="black"
      >
        Privacy Policy
      </Typography>

      <Typography
        variant="h5"
        align="center"
        component="h2"
        style={styles.sectionBody}
      >
        Thanks for entrusting www.razorswift.net with data and your pertinent
        personal information.
      </Typography>
      <Typography
        variant="h5"
        align="center"
        component="h2"
        style={styles.sectionBody}
      >
        Handling your data is a serious responsibility, and we want you to know
      </Typography>
      <Typography
        variant="h5"
        align="center"
        component="h2"
        style={styles.sectionBody}
      >
        how we go about doing that.
      </Typography>
      <Typography
        variant="h4"
        align="center"
        component="h2"
        style={styles.title}
      >
        Razor Swift Innovations Pvt Ltd.
      </Typography>
      <Typography
        variant="h5"
        align="center"
        component="h2"
        style={styles.sectionContent}
      >
        Effective Date – 09 – 02-2023{' '}
      </Typography>
      <Typography
        variant="h5"
        align="center"
        component="h2"
        style={styles.sectionContent}
      >
        Last date Modified – 09-02-2023{' '}
      </Typography>
      <Typography
        variant="h3"
        component="h2"
        style={styles.title}
        color="#2f5496"
      >
        1. Introduction
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We are Razor Swift Innovations Private Limited, a provider of career
        management and talent management services based in India. All references
        in this policy to “Razorswift.net”, “our”, “us” or “we” refer to Razor
        Swift Innovations Private Limited, or our suppliers which provide
        services to us, as appropriate.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We are committed towards protecting and safeguarding the Personal
        Information (as defined in section 1.1 herein below) of all and any of
        the users (including but not limited to customers, users, end-users,
        candidates, corporate users, users who are service providers, trainers
        and mentors) “users”, “you”, “your” which may be collected by us in
        consequence of your use / access / browsing of the Website and/or the
        Services. Any Personal Information collected from you on the Website
        shall be governed by this privacy policy (“Privacy Policy”). This
        Privacy Policy provides for the nature and type of Personal Information
        collected on the Website and/or during the provision of Services, the
        manner in which it is collected, use of such information, and disclosure
        and handling of such information by us. The users are advised to read
        this Privacy Policy, along with our Terms of Use which set out the legal
        terms governing delivery, access and use of the Services (together the
        “Terms”), before using / accessing / browsing the Website and/or
        availing Services and providing us with your Personal Information.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        This Privacy Policy is published in compliance with, inter alia:
      </Typography>
      <List>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText primary="Section 43A of the Information Technology Act, 2000;" />
        </ListItem>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText
            primary="Section 43A of the Information Technology Act, 2000; Rule 4 of the
          Information Technology (Reasonable Security Practices and – Procedures
          and Sensitive Personal Data or Information) Rules, 2011; and"
          />
        </ListItem>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText
            primary="Rule 3(1) of the Information Technology (Intermediaries Guidelines)
          Rules, 2011."
          />
        </ListItem>
      </List>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        This Privacy Policy lets you know what happens to any personal data that
        you give to us or that we collect from you. We collect only the minimum
        amount of Personal Information necessary for you to make use of our
        Services; and we will only ever use your data as this Privacy Policy
        describes.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        By using / accessing / browsing / the Website and/or Services, you
        signify your consent for Razorswift.net to manage your Personal
        Information in accordance with this Privacy Policy. If you do not agree
        with this Privacy Policy, then such you shall not be authorized to use /
        access / browse the Website and / or the Services.
      </Typography>
      <Typography
        variant="h3"
        component="h2"
        style={styles.title}
        color="#2f5496"
      >
        2. Applicability of this Privacy Policy
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        This Privacy Policy applies to the users who are using / accessing /
        browsing of Razorswift Innovations Private Limited’s website at www.
        Razorswift.net (the “Website”), our web application available on the
        Website (the “Services“) and other interactions (e.g. customer service
        inquiries, live chat etc.) you may have with Razorswift.net.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        This Privacy Policy does not apply to any third party applications or
        software that integrate with the Services, or any other third party
        products, services or businesses, where we are not the controller of
        your personal data.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        The collection and processing of information, including Personal
        Information, in the course of other contractual or commercial
        engagements that we may enter into with you, will be done in accordance
        with the specific terms applicable thereto, and not by this Privacy
        Policy.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        By using / accessing / browsing the Website and/or Services, or by
        otherwise giving us your information, you confirm that you have the
        capacity to enter into a legally binding contract and that you have
        read, understood and agreed to the practices and policies outlined in
        this Privacy Policy and our Terms of Service. You hereby consent to our
        collection, use, sharing, and disclosure of your information, including
        Personal Information, as described in this Privacy Policy.
      </Typography>
      <Typography
        variant="h3"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        3. How we handle your data
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        3. 1 Information We Collect
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        3. 1. 1 Information from website browsers
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
        fontStyle="italic"
      >
        What do we collect?
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        If you are browsing the Website, we collect the same basic information
        that many other websites collect. We use common internet technologies,
        such as web server logs. This is information we collect from everybody
        who visits our Website, whether they have an account or not.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        The information we collect about all visitors to our Website includes
        the visitor’s browser type, language preference, referring site, and the
        date and time of each visitor request. We also collect potentially
        personally-identifying information like Internet Protocol (IP) addresses
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
        fontStyle="italic"
      >
        Why do we collect this?
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        This is done to improve the visitor experience and provide better
        content and service to our current as well as prospective customers
        based on their geography and potential usage of our product and
        services.
      </Typography>

      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        3. 1. 2 Information from users uploading files
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
        fontStyle="italic"
      >
        What do we collect this?
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        If you login, upload file(s) or source candidate files using our
        Services, we collect your email address, contact information, location,
        along with details of the filename or file URL.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
        fontStyle="italic"
      >
        Why do we collect this?
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We collect this information in order to provide our career management
        and talent management services to you – without this information we are
        not able to upload files, analyze them and provide you with appropriate
        services.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        3. 1. 3 Information from users with accounts
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
        fontStyle="italic"
      >
        What do we collect?
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        If you create an account with us on our Website, we require some basic
        information at the time of account creation. You will create your own
        password, and we will ask you for your full name and a valid email
        address.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
        fontStyle="italic"
      >
        Why do we collect this?
      </Typography>
      <List>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText primary="We need this information in order to set up your account, and to provide any services you have requested from us." />
        </ListItem>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText primary="We use your email address to identify you on Razorswift.net and send important system and account notices to you. We do not use your email address for marketing purposes unless you have specifically consented to us doing this. We don’t share or sell your email address with any third parties." />
        </ListItem>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText primary="We limit our use of your Personal Information to the purposes listed in this Privacy Policy. If we need to use your Personal Information for other purposes, we will ask your permission first. You can always see what information we have, how we’re using it, and what permissions you have given us in your user profile" />
        </ListItem>
      </List>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        3. 1. 4 People who contact us with enquiries
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
        fontStyle="italic"
      >
        What do we collect?
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        If you contact us with a sales or support enquiry or request for a demo,
        we will collect the information provided when you correspond with us,
        such as your name, your address, your email address and your telephone
        number.
      </Typography>

      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
        fontStyle="italic"
      >
        Why do we collect?
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We will collect, use and store the kinds of information as set out in
        this Section 1.1 (“Personal Information”) to deal with any enquiries or
        issues you have about our Services, including any questions you may have
        about how we collect, store and use your Personal Information, or any
        requests made by you for a copy of the information we hold about you.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        3. 2 Information we do not collect
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We do not intentionally collect or store special categories of personal
        data, such as date of birth, genetic data, health information, or
        religious information. Although Razorswift.net does not request or
        intentionally collect any special categories of personal data, we
        realize that you might store this kind of information in your account,
        via the files that you upload.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        If you ask us to upload or store any files containing special categories
        of personal data on our servers, located in India, we will only do so on
        your instructions as a data processor and service provider and in
        accordance with our Terms of Service with you. You are the controller of
        this data and you must ensure that you have a legal basis to share this
        data with us.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        3. 3 How we use your information and our legal basis for doing so
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We use the information, including Personal Information, you provide to
        us in a number of ways and we have set out our legal basis for
        processing your information below:
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
        fontStyle="italic"
      >
        3. 3. 1 To provide, update, maintain and improve the services we offer
        to you
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        This is the most common usage of your information. We use your Personal
        Information to provide various Services that you have opted for, in
        accordance with our Terms of Service. In particular, we will use your
        data to: set-up an account; upload the files that you provide us with,
        to convert them to more user friendly format and fulfill and improve
        usability of Service that you have signed up for; and to send you links
        to access and view our service output to the email address you provide
        us with.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Our use of your Personal Information in this way is necessary to perform
        our obligations to provide the Services to you, under our Terms of
        Service.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
        fontStyle="italic"
      >
        3. 3. 2 To respond to your requests, comments, support enquiries, and
        sales enquiries
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        If you contact our support team we may use the information that you
        provide to us in order to help us respond to your enquiry. Our use of
        your Personal Information in this way is necessary to perform our
        customer service obligations to you, under our Terms of Service. If we
        do not have a contract with you, we may process your Personal
        Information for these purposes where it is in our legitimate interests
        to do so for customer services purposes.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        If you contact us with a sales enquiry, our marketing and sales teams
        may utilize the information that you provide to us in order to
        periodically share relevant information about the platform that may be
        of interest to you and enable your decision making.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
        fontStyle="italic"
      >
        3. 3. 3 For billing, account management and other administrative matters
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Razorswift may need to contact you for invoicing, account management,
        and similar reasons; and we use account data to administer accounts and
        keep track of billing and payments. Our use of your Personal Information
        in this way is necessary to perform our obligations to you under our
        Terms of Service. However, your information, including Personal
        Information, is accessible to only a few authorized personnel within
        Razorswift and they will only do so to contact you on any of these
        matters.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
        fontStyle="italic"
      >
        3. 3. 4 As required by applicable law, legal process or regulation
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We may use your information, including Personal Information, to comply
        with court orders and similar legal or regulatory obligations which
        apply to us. This may include where we reasonably consider it is in our
        legitimate interests or the legitimate interests of others to comply, as
        well as where we are legally required to do so.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
        fontStyle="italic"
      >
        3. 3. 5 To investigate and help prevent abuse or security issues
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We may use information such as your IP address to help us prevent abuse
        of the Services we provide and investigate any potential unauthorized
        use of those Services or other security breaches. In these
        circumstances, we believe we have a legitimate interest in handling your
        data.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We also collect and use data which is aggregated or anonymised for
        certain business purposes, such as creating aggregate statistics or
        reporting. However, no single individual will be identifiable from the
        anonymised details we collect for these purposes.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Apart from your Personal Information, we do not collect any other
        information. However, where you upload your resumes, CVs or any other
        documents in relation to a job posting or interview on the Services, we
        may have access to the information contained in such resume, CVs or
        other documents. You hereby agree and consent to our access to such
        information. You are entitled to delete any such information at your
        sole discretion.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
        fontStyle="italic"
      >
        3. 3. 6 To delete your information stored with us
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Please email us at{' '}
        <Link
          href={{
            pathname: '/',
          }}
          legacyBehavior
        >
          contact@razorswift.net
        </Link>{' '}
        stating your details and requirement for the deletion of your details
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        3. 4 Information collected inside Razorswift from Google and MS Outlook
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Razorswift requires Google and MS Outlook authorization to get access to
        user emails, these emails are scanned to find a valid attachment i.e is
        a potential resume, once the process is completed Razorswift only keeps
        the attachment and the email id of the email account used for scanning
        through email’s, whose permission is granted by the user.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Razorswift utilizes authorized Google and MS Outlook accounts to send
        relevant email communications on behalf of the registered platform user
        to candidates pertaining to the job management process as well as
        modifies the integrated Calendar for the authorized Google and MS
        Outlook accounts to schedule meetings (interviews).
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        The data obtained from Google or MS Outlook APIs will adhere to Google
        API Services and MS Outlook Services User Data Policy, including the
        Limited Use requirements.
      </Typography>
      <Typography
        variant="h3"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        4. How we share data
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        4. 1 Sharing your information
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We do not share, sell, rent or trade your email address with any third
        parties for any commercial purposes.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We may share Personal Information with a limited number of third-party
        vendors who process it on our behalf to provide or improve our Services,
        and who have agreed to privacy restrictions and security obligations
        consistent with this Privacy Policy.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We will share your Personal Information with the following third party
        vendors:
      </Typography>
      <List variant="h5" component="h2" style={styles.sectionBody}>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText primary="Microsoft Azure Services and Amazon Web Services who provides server hosting and content distribution networks (CDN’s) services;" />
        </ListItem>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText
            primary="Godaddy who provides domain name services;
              "
          />
        </ListItem>
      </List>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        When we transfer your data to our vendors, we remain responsible for it.
        We try to ensure that any third parties with whom we share your Personal
        Information are limited (by law and by contract) in their ability to use
        your Personal Information for any purpose other than to provide services
        for us.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We may share Personal Information where it is in our legitimate
        interests to do so to run, grow and develop our business if we are
        involved in a merger, sale, or acquisition. If any such change of
        ownership happens, we will ensure it is under terms that preserve the
        confidentiality of Personal Information, and we will notify you on our
        Website or by email before any transfer of your Personal Information.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        4. 2 Third-party advertising
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We do not host any third party advertising at Razorswift.net. Therefore,
        whether you access our Service outside or inside of the European
        Economic Area (“EEA”), none of personal or user data is shared with any
        third party advertising.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        4. 3 Legal disclosures
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Razorswift.net may disclose personally-identifying information or other
        information we collect about you in response to a valid subpoena, court
        order, warrant, or similar government order, or when we believe in good
        faith that disclosure is reasonably necessary to protect our property or
        rights, or those of third parties or the public at large. This may
        include exchanging Personal Information with other organisations for the
        purposes of fraud protection and credit risk reduction.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We will also disclose your Personal Information to third parties in
        order to enforce or apply our terms and conditions or any other
        agreement or to respond to any claims, to protect our rights or the
        rights of a third party, to protect the safety of any person or to
        prevent any illegal activity.
      </Typography>
      <Typography
        variant="h3"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        5. How do we manage data
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        5. 1 Security
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Razorswift.net takes the security of data very seriously, and we work
        hard to protect any information you provide to us from loss, misuse, and
        unauthorized access or disclosure. We take all reasonable precautions to
        safeguard the confidentiality of your Personal Information, including
        through use of appropriate organisational and technical measures. These
        measures take into account the sensitivity of the data we collect,
        process and store, and the current state of technology.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Given the nature of communications and information processing
        technology, Razorswift.net cannot guarantee that information, during
        transmission through the Internet or while stored on our systems or
        otherwise in our care, will be absolutely safe from intrusion by others,
        but we do our utmost to protect it. Once we have received your Personal
        Information, we will use strict procedures and security features to
        prevent unauthorised access to it.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        As a minimum we take the following measures to secure your data:
      </Typography>
      <List variant="h5" component="h2" style={styles.sectionBody}>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText primary="Physical Security - Razorswift.net infrastructure is only hosted in data centres which meet rigorous security standards. Physical access is strictly controlled both at the perimeter and at building ingress points by professional security staff utilising video surveillance, intrusion detection systems, and other electronic means." />
        </ListItem>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText primary="Data Transfer Integrity - All traffic to and from Razorswift.net servers is secured by transport level security (TLS) sent over a Secure Socket Layer (SSL), and secured using an AES 256-bit SSL certificate. This ensures that data sent between your systems and ours is encrypted using military grade encryption." />
        </ListItem>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText primary="Password Encryption - Razorswift.net user account passwords are stored in our database after being salted and hashed using the encryption algorithms." />
        </ListItem>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText primary="Firewalls - Razorswift.net enforces network level control for access to infrastructure by using multiple different firewall technologies to ensure that different components of its systems are logically isolated from one another." />
        </ListItem>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText primary="Operational Access Controls - Razorswift.net employees require access to production services for operational reasons. We employ multiple authentication mechanisms to ensure that production systems are accessed only by authorized members of staff and are protected from unauthorized access." />
        </ListItem>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText primary="Software Updates - Razorswift.net regularly applies software patches to production infrastructure in order to ensure a strong security posture to known software vulnerabilities." />
        </ListItem>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText primary="Bug Bounty Program - Razorswift.net operates an informal “bug bounty” program that encourages security researchers to perform limited and authorized testing of the integrity of Razorswift.net systems." />
        </ListItem>
      </List>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        5. 2 Data Retention and Deletion
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
        fontStyle="italic"
      >
        5. 2. 1 If you have an account with Razorswift.net
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We will retain your Personal Information for as long as your account is
        active or as needed to provide you with Services that you request. Once
        your account is deactivated we will permanently remove any files
        associated with your account in accordance with our Terms of Service.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We may, in Our sole discretion, continue to store data / information
        such as email and contact information, billing and invoice information,
        payment, late payment or non-payment information or such related
        information of the Customer for record keeping, audit, fraud and
        reporting purposes in accordance with applicable laws. For example, we
        don’t automatically delete inactive user accounts, so unless you ask us
        to permanently delete your account we will retain some account
        information to enable you to return and use our Services more easily in
        future.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
        fontStyle="italic"
      >
        5. 2. 2 If you do not have an account with Razorswift.net
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We will not store any files you upload or source using the service for
        trying the Service, and their converted format on our systems.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We will retain Personal Information such as your IP address, email
        address, contact information and browser details for no longer than 180
        days. After this time we permanently delete your browser data and
        anonymize your IP address and email address so that we can no longer
        personally identify you.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        5. 3 International data transfers
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Razorswift.net may transfer your personal data to countries other than
        the one in which you live, including to our hosting servers with reputed
        suppliers located in the United States and Asia.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        If we provide any Personal Information about you to any such non-EEA
        entities, we will take appropriate measures to ensure that the recipient
        protects your Personal Information adequately in accordance with this
        Privacy Policy. These measures may include the following permitted in
        Articles 45 and 46 of the General Data Protection Regulation (“GDPR”):
      </Typography>
      <List>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText
            primary="in the case of US based entities, entering into European Commission approved standard contractual arrangements with them, or ensuring they have signed up to the EU-US Privacy Shield (see further https://www.privacyshield.gov/welcome); or
  "
          />
        </ListItem>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText primary="in the case of entities based in other countries outside the EEA, entering into European Commission approved standard contractual arrangements with them." />
        </ListItem>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText primary="Further details on the steps we take to protect your Personal Information, in these cases, are available from us on request by contacting us by email at contact@Razorswift.net  at any time." />
        </ListItem>
      </List>
      <Typography
        variant="h3"
        component="h2"
        style={styles.title}
        color="#2f5496"
      >
        6. Your rights
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        If you have a user account for the Services you may review and edit any
        personal data you have supplied to us in your user profile. If you do
        not have a user account, or if you have questions about your account
        information or other personal data please contact us by email at
        <Link
          href={{
            pathname: '/',
          }}
          legacyBehavior
        >
          contact@Razorswift.net.
        </Link>
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Individuals located in certain countries, including the European
        Economic Area and Switzerland, have certain statutory rights in relation
        to their personal data. While some of these rights apply generally,
        certain rights apply only in certain limited circumstances. We describe
        these rights below.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Please note that we may ask you to verify your identity before taking
        further action on your request. Additionally your request and choices
        may be limited in certain cases: for example, if fulfilling your request
        would reveal information about another person, or if you ask to delete
        information which we are permitted by law or have compelling legitimate
        interests to keep.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        6.1 Right to be informed
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        You have the right to be provided with information about the data we
        hold, our data processing activities and whether we transfer personal
        data outside of the EEA, along with the methods we use to safeguard such
        data.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        6. 2 Right to access
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        In some jurisdictions, applicable law may entitle you to request copies
        of your Personal Information held by us
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        6. 3 Right to rectification
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        You have the right to ask us to correct inaccurate, out of date or
        incomplete Personal Information concerning you (and which you cannot
        update yourself within the Services).
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        6. 4 Right to erasure
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        We generally retain any Personal Information for as long as is necessary
        for the performance of the contract between you and us and to comply
        with our legal obligations. If you no longer want us to use your
        information to provide the Services to you, you can request that we
        erase your Personal Information and (if you have one) close your user
        account. Please note that if you request the erasure of your Personal
        Information:
      </Typography>
      <List>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText
            primary="We may retain some of your Personal Information as necessary for our legitimate business interests and for identification purposes, and in the interest of prevention of fraud, impersonation, etc.
  "
          />
        </ListItem>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText primary="We may retain and use your Personal Information to the extent necessary to comply with our legal obligations." />
        </ListItem>
        <ListItem style={styles.listItem}>
          <span style={styles.dot}></span>
          <ListItemText
            primary="Because we maintain the Razorswift.net Services to protect from accidental or malicious data loss and destruction, residual copies of your Personal Information may not be removed from our backup systems for a limited period of time.
  "
          />
        </ListItem>
      </List>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        6. 5 Right to object / restrict processing
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        In some jurisdictions, applicable law may entitle you to request
        Razorswift.net not to process your Personal Information for certain
        specific purposes where such processing is based on our (or another
        party’s) legitimate interests. If you object to such processing
        Razorswift.net will no longer process your Personal Information for
        these purposes unless we can demonstrate compelling legitimate grounds
        for such processing or such processing is required for the
        establishment, exercise or defence of legal claims.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        6. 6 Right to data portability
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        You may be entitled to request copies of Personal Information that you
        have provided to us in a structured, commonly used, and machine-readable
        format and/or request us to transmit this information to another service
        provider (where technically feasible). This right only applies where we
        use your Personal Information on the basis of your consent or
        performance of a contract; and where our use of your information is
        carried out by automated means.
      </Typography>
      <Typography
        variant="h3"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        7. Other important information
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        7. 1 Data subject request
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Razorswift.net will be the controller of personal data provided to, or
        used in connection with our Services, as described in this Privacy
        Policy. To the extent that we act as a data processor on your behalf in
        connection with the performance of our Services.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        If you wish to make any changes or in general manage your data stored
        with us, you can email us at{' '}
        <Link
          href={{
            pathname: '/',
          }}
          legacyBehavior
        >
          contact@Razorswift.net
        </Link>{' '}
        .
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        7. 2 Age limitations
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Persons who are competent of contracting within the meaning of the
        Indian Contract Act, 1872 shall be eligible to access, use or register
        on the Website and avail the Services. In the event that, as a minor you
        wish to use the Website and / or Services, such use shall be made
        available to you upon the review of these Terms by your legal guardian
        or parent(s) and upon them consenting to be bound by the Terms. Further,
        in the event that it is discovered that You are below the age of 18
        (eighteen) years and the Terms have not been consented to by your legal
        guardian or parent(s), or if the details provided by you are false or
        inaccurate, Razorswift shall not have the responsibility and shall not
        be held liable if the aforesaid eligibility criteria is not satisfied by
        you.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        7. 3 Changes to this Privacy Policy
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Razorswift.net reserves the right to amend, modify, add, delete or
        remove any portion of this Privacy Policy as required under any
        applicable law from time to time. Laws, regulations and industry
        standards evolve, which may make those changes necessary, or we may make
        changes to our business. We will post the changes to this page and
        update the “last modified date” when we do so. Usage of your Personal
        Information shall be governed by the last updated or revised Privacy
        Policy which shall be available on the Website. Your continued use /
        access / browsing of the Website and/or Services after any such
        amendment or modification signifies your acceptance to such amendment or
        modification. We would encourage you to review our Privacy Policy to
        stay informed. If you disagree with the changes to this Privacy Policy,
        you should deactivate your registered account for the Services, or
        otherwise cease to use / access / browse the Website and / or the
        Services.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        7. 4 Third-party links and third-party integrations
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        The Website / Services may host links to third party websites and
        services (“Third Party Links”). We have no control over such Third Party
        Links, which are provided by persons or companies other than us. We are
        not responsible for any collection or disclosure of your data /
        information or Personal Information by such companies or persons on such
        Third Party Links thereof.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Certain other features and integrations, including but not limited to
        infrastructure services, communication integrations, user visibility and
        assessment services, background verification services, training
        services, interview services, mentoring services (“Third Party
        Integrations”) are available to You through third party platforms and
        forums where applications are developed for their integration with the
        Service(s). These Third Party Integrations are governed by their own
        terms and privacy policies and You agree that We are not responsible for
        Your use of these Third Party Integrations where You choose to enable
        these Third Party Integrations and integrate them into Our Service(s).
        By enabling the Third Party Integrations, You understand and agree that
        We do not provide any warranties in any manner whatsoever for Third
        Party Integrations and We are not liable for any damage or loss caused
        or alleged to be caused by or in connection with Your enablement, access
        or use of any such Third Party Integrations, or Your reliance on the
        privacy practices, data security processes or any other policies and
        processes of such Third Party Integrations. You understand that We are
        not responsible for providing technical support for such Third Party
        Integrations and that We are not responsible for the data hosting and
        data transfer practices followed by providers of such Third Party
        Integrations. To this extent, You shall address any comments, queries,
        complaints or feedback about such Third Party Integrations to the
        respective developers or publishers as specified on such other platforms
        or forums.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        You agree and acknowledge that Third Party Links and Third Party
        Integrations have their own privacy policies governing the collection,
        storage, transfer, retention and / or disclosure of your information and
        that you access or use such Third Party Links and Third Party
        Integrations at your own risk.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        7. 5 Disclaimer
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Although we are committed to protecting your privacy, we do not make any
        promise to the effect that your information, including Personal
        Information, or private communications will always remain private or may
        be disclosed in ways not otherwise described in this Privacy Policy. You
        assume all responsibility and risk for: (i) your use of the Website and/
        or Services; (ii) use of the internet generally; (iii) the information
        you provide or access; and (iv) your conduct on and off the Website.
        Further, we assume no liability for any actions of third parties with
        regard to your Information or Personal Information which you may have
        disclosed to such third parties by accessing or visiting Third Party
        Links or using integrations, apps and custom apps are made available to
        you through the market place or other forums where applications are
        developed for their integration with the Service(s). Razorswift.net
        shall disclaim any liability arising out of your use of Third Party
        Links or any other dealings with such third parties.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        7. 6 Governing law
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        This Privacy Policy shall, in all respects, be governed by and construed
        in all respect in accordance with the laws of India. The courts in
        Bengaluru, India, shall have exclusive jurisdiction in connection with
        any dispute arising out of or in connection with these Terms.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        style={styles.sectionBody}
        color="#2f5496"
      >
        7. 7 Contacting Razor Swift
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Razor Swift Innovations Private Limited (Razorswift.net) is registered
        in India as a Private limited company with Corporate Identification
        Number (CIN) U72900KA2022PTC158222.
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Please feel free to contact Razorswift if you have any questions about
        this Privacy Policy or complaints about our practices relating to your
        Personal Information, or if you are seeking to exercise any of your
        rights described in this Privacy Policy, you may contact us at contact@
        Razorswift.net or write to our Data Protection Representative at the
        mailing address below:
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionContent}>
        Razor Swift Innovations Pvt Ltd C-1, T ZED Homes, R. Narayanapura,
        Ramagondanahalli, Whitefield Main Road, Bengaluru, Pin – 560 066.
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
