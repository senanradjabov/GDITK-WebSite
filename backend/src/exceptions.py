from fastapi import HTTPException, status


class MainException(HTTPException):
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    detail = "Server Error"
    headers = None

    def __init__(self) -> None:
        super().__init__(
            status_code=self.status_code, detail=self.detail, headers=self.headers
        )


# region News & Tag Exceptions


class CanNotAddNews(MainException):
    status_code = status.HTTP_409_CONFLICT
    detail = "Some problems"


class FileNotFind(MainException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "Image not found."


class NewsNotFind(MainException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "News not found."


class ImageExtensionsIsNotAllow(MainException):
    status_code = status.HTTP_409_CONFLICT
    detail = "Image Extensions Is Not Allow"


class TagIsNotFind(MainException):
    status_code = status.HTTP_409_CONFLICT
    detail = "Image Extensions Is Not Allow"


class NewsWithThisLangAndSlugExistence(MainException):
    status_code = status.HTTP_409_CONFLICT
    detail = "New with this lang and slug existence"


# endregion

# region Auth Exception


class UserNotFound(MainException):
    status_code = status.HTTP_409_CONFLICT
    detail = "User Not Found"


class UserAlreadyExistsException(MainException):
    status_code = status.HTTP_409_CONFLICT
    detail = "User Already Exists"


class CredentialsException(MainException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "Could not validate credentials"
    headers = {"WWW-Authenticate": "Bearer"}


class TokenIsNotFoundException(MainException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "Token isn't in cookies"
    headers = {"WWW-Authenticate": "Bearer"}


class IncorrectUserNameOrPasswordException(MainException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "Incorrect Email Or Password"
    headers = {"WWW-Authenticate": "Bearer"}


class DontHavePermissionException(MainException):
    status_code = status.HTTP_403_FORBIDDEN
    detail = "You don't have permission"
    headers = {"WWW-Authenticate": "Bearer"}


class SessionInvalid(MainException):
    status_cod = status.HTTP_401_UNAUTHORIZED
    detail = "Session is invalid"
    headers = {"WWW-Authenticate": "Bearer"}


# endregion

# region Slider


class SliderNotFind(MainException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "Slider not found."


# endregion


# region Faculty


class StaffNotFind(MainException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "Staff not found."


class DepartmentNotFind(MainException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "Department not found."


class FacultyNotFind(MainException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "Not found."


# endregion
