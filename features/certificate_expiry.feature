Feature: Expiry
  Any pilot needs a valid medical certificate to fly. Medical certificates expire in 6 - 60 months depending on age and class, https://www.faa.gov/ame_guide/app_process/general/validity


  Scenario: all medical certificates expire eventually
    Given a medical certificate validFrom "2023-02-28"
    Then on "2030-01-01" the medical certificate is expired

  Scenario: medical certificates expire - 1st Class (ATP): 12 months if younger than age 40
    Given pilot "Jane" is under 40 years old
    And pilot "Jane" has a first class license
    And pilot "Jane" has medical certificate from "2023-02-25"
    Then the medical certificate of "Jane" is expired on "2024-03-01"

  Scenario Outline: medical certificates expire after some months
    Given pilot "Jane" is <age> years old
    And pilot "Jane" has a license class "<class>"
    And pilot "Jane" has valid medical certificate
    And pilot "Jane"s medical certificate is valid for another <duration> months

    Examples:
      | age | class | duration |
      | 39  | 1     | 12       |
      | 40  | 1     | 6        |
      | 39  | 2     | 12       |
      | 40  | 2     | 12       |
      | 39  | 3     | 60       |
      | 40  | 3     | 24       |

  Scenario Outline: expiry examples where the licence class drops
    Given pilot "Jane" is <age> years old
    And pilot "Jane" has a license class "<class>"
    And pilot "Jane" has valid medical certificate
    When pilot "Jane"s medical certificate expires
    Then pilot "Jane" has a license of class "<expectedPilotLicenseClassAfterExpiry>"
    And pilot "Jane"s medical certificate is valid for another <duration> months

    Examples:
      | age | class | expectedPilotLicenseClassAfterExpiry | duration |
      | 39  | 1     | 3                                    | 48       |
      | 40  | 1     | 2                                    | 6        |
      | 39  | 2     | 3                                    | 48       |
      | 40  | 2     | 3                                    | 12       |

  Scenario Outline: expiry examples where the pilot license expires
    Given pilot "Jane" is <age> years old
    And pilot "Jane" has a license class "3"
    And pilot "Jane" has valid medical certificate
    When pilot "Jane"s medical certificate expires
    Then pilot "Jane" has a license of class "expired"
    And pilot "Jane"s medical certificate is expired

    Examples:
      | age |
      | 39  |
      | 40  |

  Scenario: medical certificate expiry is calculated from last day of month
    Given a medical certificate valid from "2023-12-20"
    And the medical certificate is valid for 1 month
    Then the medical certificate is not expired on "2023-12-31"
    And the medical certificate is not expired on "2023-12-21"
    And the medical certificate is expired on "2024-02-01"
    And the medical certificate is not expired on "2024-01-31"

  Scenario: medical certificate leap year....


