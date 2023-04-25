using api.Dtos.Auth;
using api.Dtos.User;
using api.Models;
using api.Repositories;
using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace api.Services;

public class UserService
{
    private readonly UserRepository _repository;
    private readonly TokenService _tokenService;

    public UserService(
        [FromServices] UserRepository repository,
        [FromServices] TokenService tokenService
    )
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
        var newUser = await CreateUserAsync<CreateUser>(body!);
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
}
