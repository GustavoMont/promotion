using System.Security.Claims;
using api.Dtos.Auth;
using api.Dtos.User;
using api.Models;
using api.Repositories;
using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace api.Services;

public class UserService : BaseService
{
    private readonly UserRepository _repository;
    private readonly TokenService _tokenService;

    public UserService(
        [FromServices] UserRepository repository,
        [FromServices] TokenService tokenService,
        [FromServices] IHttpContextAccessor httpContextAccessor
    )
        : base(httpContextAccessor)
    {
        _repository = repository;
        _tokenService = tokenService;
    }

    private async Task<User> CreateUserAsync<T>(T body)
    {
        var newUser = body!.Adapt<User>();
        return await _repository.CreateAsync(newUser);
    }

    public async Task<TokenResponse> LoginAsync(LoginRequest body)
    {
        var user = await _repository.GetByEmailAsync(body.Email);
        var errorMessage = "Usuário ou senha incorretos";
        if (user is null)
        {
            throw new BadHttpRequestException(errorMessage);
        }
        if (user.Password is null || !BCrypt.Net.BCrypt.Verify(body.Password, user.Password))
        {
            throw new BadHttpRequestException(errorMessage);
        }
        return new TokenResponse(_tokenService.GenerateToken(user));
    }

    public async Task<UserResponse> GetMe()
    {
        return await GetById(GetCurrentUserId());
    }

    public async Task<UserResponse> GetById(int id)
    {
        var user = await _repository.GetById(id);
        if (user is null)
        {
            throw new Exception("Usuário não encontrado");
        }
        return user.Adapt<UserResponse>();
    }

    public async Task<TokenResponse> CreateAsync(CreateUser body)
    {
        var user = await _repository.GetByEmailAsync(body.Email);
        if (user is not null)
        {
            throw new BadHttpRequestException("Usuário já cadastrado");
        }
        if (body.Password != body?.ConfirmPassword)
        {
            throw new BadHttpRequestException("Senhas não conhecidem");
        }
        var newUser = await CreateUserAsync(body!);
        return new TokenResponse(_tokenService.GenerateToken(newUser));
    }

    public async Task<GetOrCreateResponse> GetOrCreateAsync(CreateUserByFirebase body)
    {
        User? user = await _repository.GetByEmailAsync(body.Email!);
        var statusCode = 200;
        if (user is null)
        {
            user = await CreateUserAsync<CreateUserByFirebase>(body);
            statusCode = 201;
        }

        return new GetOrCreateResponse(statusCode, _tokenService.GenerateToken(user));
    }

    public async void UpdatePassword(RequestUpdatePassword request)
    {
        var userId = GetCurrentUserId();
        var user = await _repository.GetById(userId); 
        if(!BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user?.Password))
        {
            throw new BadHttpRequestException("Senha atual incorreta");
        }
        user.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword); 
        _repository.UpdatePassword(user); 
    }
}
