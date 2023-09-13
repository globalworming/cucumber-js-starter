Feature: Expiry
  Any pilot needs a valid medical certificate to fly. Medical certificates expire in 6 - 60 months depending on age and class, https://www.faa.gov/ame_guide/app_process/general/validity


  Scenario Outline: all medical certificates expire eventually
    Given a license with class "<class>" validFrom "2023-02-28"
    Then on "2030-01-01" the license is expired
    Examples:
      | class |
      | 1     |
      | 2     |
      | 3     |

  Scenario: medical certificates expire - 1st Class (ATP): Every 12 months if younger than age 40
    Given pilot Jane is under 40 years old
    And pilot Jane has a first class license
    And pilot Jane has medical certificate from "2023-02-25"
    Then on "2024-02-26" the medical certificate is expired

  Scenario: medical certificates expire - 1st Class (ATP): Every 6 months over 40
    Given pilot Jane is over 40 years old
    And pilot Jane has a first class license
    And pilot Jane has medical certificate from "2023-02-25"
    Then on "2023-08-26" the medical certificate is expired

  Scenario: 1st Class license drops to 3rd class when medical certificate expires
    Given pilot Jane is under 40 years old
    And pilot Jane has a first class license
    And pilot Jane has medical certificate from "2023-02-25"
    When medical certificate expires
    Then pilot Jane has a 3rd class license for 48 months

  Scenario Outline: expiry examples
    Given pilot is <age> years old
    And pilot has a license class "<class>"
    And pilot has medical certificate from "2023-02-25"
    When medical certificate expires
    Then pilot has a <expectedPilotLicenseClassAfterExpiry> license for <duration> months

    Examples:
      | age | class | expectedPilotLicenseClassAfterExpiry | duration |
      | 39  | 1     | 3                                    | 48       |
      | 40  | 1     | 2                                    | 6        |
      | 39  | 2     | 3                                    | 48       |
      | 40  | 2     | 3                                    | 12       |
      | 39  | 3     | expired                              |          |
      | 39  | 3     | expired                              |          |

  Scenario: medical certifcate expiry is calculated from last day of month
    Given a medical certificate valid from "2023-12-20" for pilot with licence class 1 over age 40
    Then it is valid on "2023-12-31"
    And it is valid on "2023-12-21"
    And it is not valid "2024-07-01"
    And it is valid "2024-06-31"

  Scenario: medical certificate leap year....


