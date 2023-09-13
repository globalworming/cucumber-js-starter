Feature: Expiry
  Any pilot needs a valid medical certificate to fly. Medical certificates expire in 6 - 60 months depending on age and class


  Scenario Outline: all licenses expire eventually
    Given a license with class "<class>" validFrom "2023-02-28"
    Then on "2030-01-01" the license is expired
    Examples:
      | class |
      | 1   |
      | 2  |
      | 3  |