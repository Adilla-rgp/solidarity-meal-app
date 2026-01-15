# -*- coding: utf-8 -*-
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from extensions import db
from models import Doacao, Reserva
from datetime import datetime, timedelta

stats_bp = Blueprint('stats', __name__)

@stats_bp.route('/estatisticas', methods=['GET', 'OPTIONS'])
@jwt_required()
def get_estatisticas():
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        claims = get_jwt()
        user_id = int(get_jwt_identity())  # 🔑 converter para inteiro
        tipo = claims.get('tipo')
        
        if tipo == 'doador':
            # Estatísticas para doador
            total_doacoes = Doacao.query.filter_by(doador_id=user_id).count()
            doacoes_ativas = Doacao.query.filter_by(doador_id=user_id, status='ativa').count()
            doacoes_reservadas = Doacao.query.filter_by(doador_id=user_id, status='reservada').count()
            doacoes_entregues = Doacao.query.filter_by(doador_id=user_id, status='entregue').count()
            
            trinta_dias_atras = datetime.utcnow() - timedelta(days=30)
            doacoes_recentes = Doacao.query.filter(
                Doacao.doador_id == user_id,
                Doacao.created_at >= trinta_dias_atras
            ).count()
            
            return jsonify({
                'success': True,
                'estatisticas': {
                    'total_doacoes': total_doacoes,
                    'doacoes_ativas': doacoes_ativas,
                    'doacoes_reservadas': doacoes_reservadas,
                    'doacoes_entregues': doacoes_entregues,
                    'doacoes_recentes': doacoes_recentes
                }
            }), 200
            
        elif tipo == 'beneficiario':
            # Estatísticas para beneficiário
            total_reservas = Reserva.query.filter_by(beneficiario_id=user_id).count()
            reservas_ativas = Reserva.query.filter_by(beneficiario_id=user_id, status='ativa').count()
            reservas_concluidas = Reserva.query.filter_by(beneficiario_id=user_id, status='concluida').count()
            reservas_canceladas = Reserva.query.filter_by(beneficiario_id=user_id, status='cancelada').count()
            
            return jsonify({
                'success': True,
                'estatisticas': {
                    'total_reservas': total_reservas,
                    'reservas_ativas': reservas_ativas,
                    'reservas_concluidas': reservas_concluidas,
                    'reservas_canceladas': reservas_canceladas
                }
            }), 200
            
        else:
            return jsonify({'error': 'Tipo de usuario invalido'}), 400
            
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar estatisticas: {str(e)}'}), 500


@stats_bp.route('/grafico-mensal', methods=['GET', 'OPTIONS'])
@jwt_required()
def grafico_mensal():
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        claims = get_jwt()
        user_id = int(get_jwt_identity())  # 🔑 converter para inteiro
        
        if claims.get('tipo') != 'doador':
            return jsonify({'error': 'Acesso negado'}), 403
        
        # Últimos 6 meses
        hoje = datetime.utcnow()
        dados = []
        
        for i in range(6):
            mes = hoje.month - i
            ano = hoje.year
            if mes <= 0:
                mes += 12
                ano -= 1
            
            inicio_mes = datetime(ano, mes, 1)
            fim_mes = datetime(ano + 1, 1, 1) if mes == 12 else datetime(ano, mes + 1, 1)
            
            count = Doacao.query.filter(
                Doacao.doador_id == user_id,
                Doacao.created_at >= inicio_mes,
                Doacao.created_at < fim_mes
            ).count()
            
            dados.append({
                'mes': f'{mes:02d}/{ano}',
                'quantidade': count
            })
        
        dados.reverse()
        
        return jsonify({
            'success': True,
            'dados': dados
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro ao gerar grafico: {str(e)}'}), 500